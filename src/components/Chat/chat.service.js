import { SERVICE_URL } from "../../common/utils/api.consts";
import serviceClient from '../../common/serviceClient';

const CHAT_SERVICE_URI = `${SERVICE_URL}/chat`;

export const sendNewMessage = async (content) => {

    const { data } = await serviceClient.post(`${CHAT_SERVICE_URI}/newMessage`, {
        message: content
    });
}