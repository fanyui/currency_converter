
var idbPromis = window.indexedDB.open("currencies", 1);

idbPromis.onerror = function(event) {
  console.log("fatal error");
};

idbPromis.onsuccess = function(event) {
  console.log("successfully created database");
};

idbPromis.onupgradeneeded = function(event){
  var upgradeDb = event.target.result;
    var store = upgradeDb.createObjectStore('currency',{
         keyPath: "query" 
      });
    store.transaction.oncomplete = function(event){
      var currencyObjectStore = upgradeDb.transaction("currency", "readwrite").objectStore('currency');
      currencyObjectStore.add({query:"CFA_UTC", rate: 0.234});
    }
}
if(!navigator.serviceWorker){

  console.log("dosn't sp");
}
  else{
    // fetch("https://free.currencyconverterapi.com/api/v5/currencies").then(function(data){
    //   // const currency = data.json();
    //   console.log(data.json());
    //   // for(const cur of currency){
    //   //   console.log(cur);
    //   // }
    //   // console.log(currency);

    //   // for(let currency of data){
    //   //   console.log(currency.currencyName);
    //   // }


    // }).catch(error => {
    //       console.error('Error executing fetch over the network', error);
    //     });

    fetch("https://free.currencyconverterapi.com/api/v5/currencies").then(response=>response.json()).then(data=>{
      const result = data;
      // for( let cur of result){
      //   console.log(cur);
      // }
     var  selectFrom = document.getElementById('inputFrom');
     var  selectTo = document.getElementById('inputTo');
      for (let key in data.results) {
          let name = data.results[`${key}`].currencyName;
          var opt = document.createElement('option');
          var opt2 = document.createElement('option');
              opt.value = data.results[`${key}`].id;
              opt2.value = data.results[`${key}`].id;
              opt.innerHTML = name;
              opt2.innerHTML = name;
              selectFrom.appendChild(opt);
              selectTo.appendChild(opt2);

                console.log(name);
        }
      //console.log(result);
      // return result;
    }).catch(error => {
          console.error('Error executing fetch over the network', error);
        });
     
      navigator.serviceWorker
      .register("sw.js")
      .then(registration => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and
                  // the fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in your web app.
                  console.log('New content is available; please refresh.');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a
                  // "Content is cached for offline use." message.
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
      }



submitForm = () => {

            let From = $("#inputFrom").val();
            let To = $("#inputTo").val();
            let money = $("#amount").val();
            let result = $("#result");
            let query = `${From}_${To}`;
            console.log(From+"_ "+To);


        
            let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
            fetch(url).then(response=>response.json()).then((data) => {
              result.val( data[query].val * money);
              console.log(data[query].val);
            })


}
