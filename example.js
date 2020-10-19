'use strict';

var treegen = require('./index');

const createTreeAndSaveToFile = (depth, spread, file) => {
  const tree = treegen({depth, spread});

  const fs = require('fs');
  fs.writeFile(file, JSON.stringify(tree, null, '\t'), function(err) {
    console.log(err || 'ok');
  });
}



createTreeAndSaveToFile(2, 3, './generated/example2_3.json');
createTreeAndSaveToFile(4, 3, './generated/example4_3.json');
createTreeAndSaveToFile(4, 7, './generated/example4_7.json');