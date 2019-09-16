class AppService {
  listEvent = [];

  subscribe = f => this.listEvent.push(f);

  unSubscribe = f => {
      let i = this.listEvent.indexOf(f)
      this.listEvent.splice(i, 1)
  }

  constructor(data){
      this['data'] = data;

      this['update'] = (newData) => {
          this['data'] = {...this['data'], ...newData};
          this.listEvent.forEach(f => f());
      }
  }
}

export default function createService(initData){
  return new AppService(initData)
}