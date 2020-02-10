# jBoxNumber
jBoxNumber Semplice footer paginatore per chi ha bisogno della costruzione del solo navigatore numerico

 
# Getting Started

1. Includi jBoxNumber nella tua pagina prima della chiusura del tag </body> 

```html
  <link href="../dist/css/jboxnumber.css" rel="stylesheet" type="text/css"/>

  <script src="../dist/js/jBoxNumber.js"></script>

```


* ## [Demo jBoxNumber](https://mssalvo.github.io/jBoxNumber/)
 
 
__Esempio di istanza jBoxNumber v.1.0.0__
1. Includi nella pagina il tag html che racchiude il tuo navigatore
```html

  <div class="container" id="jboxnumber"> </div>

```
2. istanza il tuo jBoxNumber
 
 ```js

      jBoxNumber.get('home',
		{currentPage:1,
		totalPage: 100,
		pageEnd:7,
		boxHome:'#jboxnumber',
		send:function(i){console.log(i)}
		});

 ```        
__Recupera l'istanza__

 ```js
 
 jBoxNumber.boxing.myname
 
 ```
 
 
 ## License

jBoxNumber jBoxNumber è disponibile sotto la licenza MIT. Vedi [LICENSE](https://github.com/mssalvo/jBoxNumber/blob/master/LICENSE) per maggiori informazioni.
