mod domain;
mod implements;
mod usecases;

use crate::usecases::add_counter_usecase::AddCounterUsecase;
use domain::discord_api::ApiUser;
use implements::toxic_counter::AddToxicCounter;

fn random_user(user_id: i64) -> ApiUser {
    return ApiUser {
        id: user_id,
        username: "Username".to_string(),
        discriminator: "2341".to_string(),
        avatar: "avatar".to_string(),
        bot: false,
    };
}

fn main() {
    let test = AddToxicCounter {};

    let result = test.handle(&random_user(1), &random_user(1));

    print!(
        "{}",
        test.message_handle(&random_user(1), &random_user(2), result)
    );
}
