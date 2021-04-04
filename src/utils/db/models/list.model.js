import Utils from '../utils';
class ListModel {
  constructor(text, status, colorName) {
    this.id = Utils.guid();
    this.text = text;
    this.status = status || false;
    this.colorName = colorName;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
module.exports = ListModel;
