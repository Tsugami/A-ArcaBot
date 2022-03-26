use crate::domain::discord_api::ApiUser;

pub enum CounterError {
    /// Error when failing to create a new counter
    FailedToCreate,
    /// Error when the author denounced the user recently
    RateLimit,
    /// Error when the user is a bot
    Bot,
    /// Error when the user is the same as the author
    Yourself,
}

pub trait AddCounterUsecase {
    fn create_counter(&self, witness_user: &ApiUser, user: &ApiUser) -> Result<i32, CounterError>;
    fn is_recently_denounced(&self, witness_user: &ApiUser, user: &ApiUser) -> bool;
    fn message_handle(
        &self,
        witness_user: &ApiUser,
        user: &ApiUser,
        result: Result<i32, CounterError>,
    ) -> String;

    fn handle(&self, witness_user: &ApiUser, user: &ApiUser) -> Result<i32, CounterError> {
        if user.bot {
            return Err(CounterError::Bot);
        }
        if witness_user.id == user.id {
            return Err(CounterError::Yourself);
        }

        if self.is_recently_denounced(witness_user, user) {
            return Err(CounterError::RateLimit);
        }

        if let Ok(counter) = self.create_counter(witness_user, user) {
            return Ok(counter);
        }

        return Err(CounterError::FailedToCreate);
    }
}
