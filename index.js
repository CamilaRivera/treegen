var faker = require('faker');

function createIdGenerator () {
  let nextId = 1;
  return () => nextId++;
}

function createTree(args, currentDepth = 0, idGenerator) {
  var node = {
    name: args.name(),
    data: args.data(),
    children: [],
    id: idGenerator(),
  };

  if (currentDepth < args.depth) {
    const targetSpread = Math.random() * args.spread;
    for (var i = 0; i < targetSpread; i++) {
      const newChild = createTree(args, currentDepth + 1, idGenerator);
      node.children.push(newChild);
    }
  }
  return node;
}



module.exports = function(args) {
  args.depth = args.depth === undefined ? 1 : args.depth;
  args.spread = args.spread === undefined ? 1 : args.spread;
  args.name = args.name || function() {
    return faker.name.findName();
  };

  args.data = args.data || function() {
    return {
      'user': faker.internet.userName(),
      'host': faker.internet.domainName(),
      'city': faker.address.city()
    };
  };
  return createTree(args, 0, createIdGenerator());
};
