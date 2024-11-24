import { ImessagesSerialization } from "./imessages-serialization";

export interface IchatSerialization {
    _id: string,
    id_user_1: number,
    id_user_2: number,
    messages: ImessagesSerialization[];
}
