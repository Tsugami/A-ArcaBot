import { APIUser } from '../types';
import { ToxicRepository } from '../db';
import { MESSAGES } from '../constants';
import { ok, error } from '../utils/response';

export class AddToxicUseCase {
  constructor(private toxicRepo: ToxicRepository) {}

  async handle(params: AddToxicUseCase.Params) {
    const { viewerUser, toxicUser } = params;

    if (viewerUser.id === toxicUser.id) {
      return error(MESSAGES.TOXIC_YOURSELF_ERROR);
    }

    if (toxicUser.bot) {
      return error(MESSAGES.TOXIC_BOT_ERROR);
    }

    try {
      const count = await this.toxicRepo.incrementToxicCount(viewerUser.id, toxicUser.id);

      return ok(MESSAGES.TOXIC_SUCCESS(viewerUser, toxicUser, count));
    } catch (err) {
      return error(MESSAGES.UNKNOWN_ERROR);
    }
  }
}

namespace AddToxicUseCase {
  export interface Params {
    viewerUser: APIUser;
    toxicUser: APIUser;
  }
}
