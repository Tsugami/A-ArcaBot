mod discord;
mod domain;
mod implements;
mod usecases;

use discord::event_handler::Handler;
// use domain::discord_api::ApiUser;
// use crate::usecases::add_counter_usecase::AddCounterUsecase;
// use implements::toxic_counter::AddToxicCounter;

// fn random_user(user_id: i64) -> ApiUser {
//     return ApiUser {
//         id: user_id,
//         username: "Username".to_string(),
//         discriminator: "2341".to_string(),
//         avatar: "avatar".to_string(),
//         bot: false,
//     };
// }

use serenity::{client::Client, framework::StandardFramework};

#[tokio::main]
async fn main() {
    let token = "NTA3NTYwMTA1ODE1MDQ4MjEy.W9sMLw.Fvj_BlEncZO8kg9CdMWdHy7Hukg";
    let application_id = 507560105815048212;
    // let guild_id = 511010989842797056;

    let framework = StandardFramework::new();

    let mut client = Client::builder(token)
        .application_id(application_id)
        .event_handler(Handler)
        .framework(framework)
        .await
        .expect("Error creating client");

    if let Err(why) = client.start().await {
        println!("An error occurred while running the client: {:?}", why);
    }
}
