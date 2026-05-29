const getAllProductsQueryParser = (query) => {
  const filters = {};
  const sort = [];
  let limit;
  let offset;

  for (let param of Object.keys(query)) {
    const key = param;
    const value = query[param];
    switch (key) {
      case "search":
        const [searchField, pattern] = value.split(":");
        filters[searchField] = { pattern };
        break;
      case "sort":
        const [field, direction] = value.split(":");
        sort.push({ field, direction });
        break;
      case "limit":
        limit = parseInt(value);
        break;
      case "offset":
        offset = parseInt(value);
        break;
      default:
        filters[key] = value;
    }
  }
  return { filters, sort, limit, offset };
};

module.exports = {
  getAllProductsQueryParser,
};
