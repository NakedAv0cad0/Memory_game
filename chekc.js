const request = (source, callback)=> {
  const request = new XMLHttpRequest();
  request.open('GET', source)
  request.send()

  request.addEventListener('readystatechange', ()=> {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText)
      callback(udifined, data)
    }else if (request.readyState === 4) {
      callback('could not fetch the data', undifined)
    };
  })
}

request('/todos/shaun.json', (err, data)=> {
  console.log(data)
  request('/todos/luigie.json', (err, data)=> {
    console.log(data)
    request('/todos/marion.json', (err, data)=> {
      console.log(...data)
    })
  })
})