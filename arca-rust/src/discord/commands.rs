use serenity::{
    builder::{CreateApplicationCommand, CreateApplicationCommandOption},
    model::{
        id::GuildId,
        interactions::application_command::{ApplicationCommandOptionType, ApplicationCommandType},
    },
};

fn commands() -> [CreateApplicationCommand; 2] {
    let guild_id = GuildId(
        511010989842797056
        // env::var("GUILD_ID")
        //     .expect("Expected GUILD_ID in environment")
        //     .parse()
        //     .expect("GUILD_ID must be an integer"),
    );

    let commands = GuildId::set_application_commands(&guild_id, &ctx.http, |commands| 
    let ToxicChatInputCommand = CreateApplicationCommand();
    // .name("tóxico")
    // .kind(ApplicationCommandType::ChatInput)
    // .description("Denunciar um usuário como tóxico.")
    // .add_option(
    //     CreateApplicationCommandOption()
    //         .name("usuário")
    //         .kind(ApplicationCommandOptionType::User)
    //         .description("O usuário que será denunciado.")
    //         .required(true),
    // );

    let ToxicUserCommand = CreateApplicationCommand(HashMap {})
        .name("tóxico")
        .kind(ApplicationCommandType::User)
        .description("Denunciar um usuário como tóxico.");

    return [ToxicChatInputCommand, ToxicUserCommand];
}
