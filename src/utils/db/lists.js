import Realm from 'realm';
import ListModel from './models/list.model';

const schemaList = 'ListtableListD3';

let tableList = new Realm({
  schema: [
    {
      name: schemaList,
      primaryKey: 'id',
      properties: {
        id: {type: 'string', indexed: true},
        text: 'string',
        colorName: 'string',
        status: 'bool',
        createdAt: 'date',
        updatedAt: 'date',
      },
    },
  ],
});

let ListService = {
  findAll: function (sortBy) {
    if (!sortBy)
      sortBy = [
        ['status', false],
        ['updatedAt', true],
      ];
    return tableList.objects(schemaList).sorted(sortBy);
  },

  save: function (data) {
    if (
      tableList.objects(schemaList).filtered("text = '" + data.text + "'")
        .length
    )
      return;

    tableList.write(() => {
      data.updatedAt = new Date();
      tableList.create(schemaList, data);
    });
  },

  update: function (data, callback) {
    if (!callback) return;
    tableList.write(() => {
      callback();
      data.updatedAt = new Date();
    });
  },

  delete: function (id) {
    if (!id) return;
    tableList.write(() =>
      tableList.delete(tableList.objectForPrimaryKey(schemaList, id)),
    );
    return true;
  },
};

export default ListService;
