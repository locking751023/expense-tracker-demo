const recordSeeder = () => {
  const records = [];
  for (let i = 1; i <= 30; i += 1) {
    records.push({
      id: i,
      products: [
        {
          id: 'prod-1',
          name: '蹄膀',
          price: 220,
          unit: '個',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-2',
          name: '豬腳',
          price: 12,
          unit: '兩',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-3',
          name: '五花肉',
          price: 22,
          unit: '兩',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-4',
          name: '嘴邊肉',
          price: 1.375,
          unit: '兩',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-5',
          name: '大腸',
          price: 30,
          unit: '兩',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-6',
          name: '豬尾',
          price: 22,
          unit: '兩',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-7',
          name: '雞腿',
          price: 33,
          unit: '支',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-8',
          name: '雞腳',
          price: 37.5,
          unit: '兩',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-9',
          name: '豬耳',
          price: 18,
          unit: '兩',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-10',
          name: '豬舌',
          price: 80,
          unit: '個',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
        {
          id: 'prod-11',
          name: '雞翅',
          price: 18,
          unit: '支',
          count: Math.floor(Math.random() * 20) + 10,
          sendBack: Math.floor(Math.random() * 10),
        },
      ],
      cost: Math.floor(Math.random() * 10000) + 1000,
      revenue: Math.floor(Math.random() * 10000) + 5000,
      date: `2022/08/${i}`,
      local: `第${i}市場`,
    });
  }
  return records;
};
export default recordSeeder;
