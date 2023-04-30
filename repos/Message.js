import Messages from "../models/model/Messages.js";
import MessageDAOFactory from "../models/factories/Message.js";
import { tranformToDTO_Messages } from "../models/DTOs/MessageDTO.js";

export default class MessageRepo {
  constructor() {
    this.factory = new MessageDAOFactory()
    this.dao = this.factory.getDAO();
  }

  async getAll() {
    const messagesDto = await this.dao.getAll();
    return messagesDto.map((dto) => new Category(dto));
  }

  async getById(id) {
    const messageDto = await this.dao.getById(id);
    return messageDto ? new Messages(messageDto) : null;
  }

  async save(message) {
    const dto = tranformToDTO_Messages(message);
    const saved = await this.dao.save(dto);
    return new Messages(saved);
  }

  async update(id, message) {
    const updated = await this.dao.update(id, tranformToDTO_Messages(message));
    return new Messages(updated);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }
}