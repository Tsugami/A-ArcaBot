// use std::fmt::Display;

use serenity::model::prelude::User;

/// The User Structure from Discord
///
/// [Here is a link!](https://discord.com/developers/docs/resources/user#user-object-user-structure)
pub type ApiUser = User;

// {
//     pub id: i64,
//     pub username: String,
//     pub discriminator: String,
//     pub avatar: String,
//     pub bot: bool,
// }

// impl Display for ApiUser {
//     fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
//         write!(f, "<!{}>", self.id)
//     }
// }
