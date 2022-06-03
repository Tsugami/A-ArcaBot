use crate::domain::discord_api::ApiUser;
use crate::usecases::add_counter_usecase::AddCounterUsecase;
use crate::usecases::add_counter_usecase::CounterError;

pub struct AddToxicCounter;

impl AddCounterUsecase for AddToxicCounter {
    fn create_counter(
        &self,
        _witness_user: &ApiUser,
        _user: &ApiUser,
    ) -> Result<i32, CounterError> {
        return Ok(1);
    }

    fn is_recently_denounced(&self, _witness_user: &ApiUser, _user: &ApiUser) -> bool {
        return false;
    }

    fn message_handle(
        &self,
        witness_user: &ApiUser,
        user: &ApiUser,
        result: &Result<i32, CounterError>,
    ) -> String {
        match result {
            Ok(count) => format!(
                "{target_user} Tóxico! {source_user} testemunhou o {source_user} sendo tóxico. (No total, {target_user} foi tóxico {count} vezes)",
                source_user = witness_user.to_string(),
                target_user = user.to_string(),
                count = count),
            Err(CounterError::Bot) => "Bots não são tóxicos! <:CatRee:702759289516982282>".to_string(),
            Err(CounterError::RateLimit) => "Você já denunciou recentemente o mesmo usuário! <:CatRee:702759289516982282>".to_string(),
            Err(CounterError::Yourself) => "Você não pode denunciar você mesmo! <:CatRee:702759289516982282>".to_string(),
            _ => "Ocorreu um erro desconhecido. Tente novamente mais tarde.".to_string()
        }
    }
}
