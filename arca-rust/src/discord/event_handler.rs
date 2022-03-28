use serenity::{
    async_trait,
    model::{
        gateway::Ready,
        id::GuildId,
        interactions::{
            application_command::{
                ApplicationCommandInteraction, ApplicationCommandInteractionDataOptionValue,
                ApplicationCommandOptionType, ApplicationCommandType, ResolvedTarget,
            },
            Interaction, InteractionApplicationCommandCallbackDataFlags, InteractionResponseType,
        },
        prelude::User,
    },
    prelude::*,
};

use crate::{implements::toxic_counter, usecases::add_counter_usecase::AddCounterUsecase};

pub struct Handler;

// Get the choosen option value from the interaction data.
fn get_target_user(command: &ApplicationCommandInteraction) -> Option<&User> {
    match command.data.kind {
        ApplicationCommandType::ChatInput => {
            let options = command
                .data
                .options
                .get(0)
                .expect("Expected user option")
                .resolved
                .as_ref()
                .expect("Expected user object");

            if let ApplicationCommandInteractionDataOptionValue::User(user, _member) = options {
                Some(&user)
            } else {
                None
            }
        }
        ApplicationCommandType::User => {
            if let Some(ResolvedTarget::User(user, _member)) = &command.data.target {
                Some(&user)
            } else {
                None
            }
        }
        _ => None,
    }
}

#[async_trait]
impl EventHandler for Handler {
    async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
        if let Interaction::ApplicationCommand(command) = interaction {
            let name = command.data.name.as_str();

            if name == "tóxico" {
                if let Some(target_user) = get_target_user(&command) {
                    let toxic_counter = toxic_counter::AddToxicCounter {};
                    let result = toxic_counter.handle(&command.user, target_user);
                    let content = toxic_counter.message_handle(&command.user, target_user, &result);

                    if let Err(why) = command
                        .create_interaction_response(&ctx.http, |response| {
                            response
                                .kind(InteractionResponseType::ChannelMessageWithSource)
                                .interaction_response_data(|message| {match result {
                                    Ok(_any) => message.content(content),
                                    Err(_why) => {
                                        message.flags(InteractionApplicationCommandCallbackDataFlags::EPHEMERAL).content(content)
                                    }
                                }})
                        })
                        .await
                    {
                        println!("Error creating interaction response: {:?}", why);
                    };
                }
            }
        }
    }

    async fn ready(&self, ctx: Context, ready: Ready) {
        println!("{} is connected!", ready.user.name);

        let guild_id = GuildId(
            // TODO: Get guild id from configuration file.
            323999635993657344
            // env::var("GUILD_ID")
            //     .expect("Expected GUILD_ID in environment")
            //     .parse()
            //     .expect("GUILD_ID must be an integer"),
        );

        let result = GuildId::set_application_commands(&guild_id, &ctx.http, |commands| {
            commands
                .create_application_command(|command| {
                    command.name("tóxico").kind(ApplicationCommandType::User)
                })
                .create_application_command(|command| {
                    command
                        .name("tóxico")
                        .kind(ApplicationCommandType::ChatInput)
                        .description("Denunciar um usuário como tóxico.")
                        .create_option(|option| {
                            option
                                .name("usuário")
                                .description("O usuário que será denunciado.")
                                .kind(ApplicationCommandOptionType::User)
                                .required(true)
                        })
                })
        })
        .await
        .unwrap();

        println!(
            "I now have the following guild slash commands: {:?}",
            result
                .iter()
                .map(|cmd| cmd.name.clone())
                .collect::<Vec<String>>()
        );
    }
}
