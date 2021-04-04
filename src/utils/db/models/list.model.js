import Utils from '../utils';
class ListModel {
  constructor(text, status, colorName, items) {
    this.id = Utils.guid();
    this.text = text;
    this.status = status || false;
    this.colorName = colorName;
    this.items = items;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
module.exports = ListModel;
