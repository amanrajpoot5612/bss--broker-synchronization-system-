function normalizeZerodhaData({ orders = [], positions = [], holdings = [] }) {
    const normalizeArray = (arr, type) => {
        arr.map(item => {
            normalized = {}
            for(let key in item){
                nomralized[key] = typeof item[key] === "number" ? item[key] : isNaN(Number(item[key])) ? item[key] : Number(item[key]); 
            }
        })
          normalized.source = type;  // add a 'source' field: 'order', 'position', or 'holding'
            return normalized;
    }
}