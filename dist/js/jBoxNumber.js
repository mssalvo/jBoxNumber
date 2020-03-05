/*!
 * jBoxNumber ©
 * @version 1.0.0
 * @author salvatore mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/jBoxNumber
 * MIT License
 * Copyright and license :
 * https://github.com/mssalvo/jBoxNumber/blob/master/LICENSE
 */

function jBoxNumber() {
    this.name = arguments[0] || 'jbox';
    return this.setting(arguments[1] || {currentPage:1,totalPage: 100,pageEnd:7,boxHome:'#jboxnumber',send:function(){}});
}
jBoxNumber.boxing = {};
jBoxNumber.prototype = {
    setting: function (o) {
        this.currentPage = o.currentPage || 1;
        this.totalPage = o.totalPage || 1;
        this.pageStart = o.pageStart || 1;
        this.pageEnd = o.pageEnd || 7;
        this.pageRange = 3;
        this.pageElement = o.pageEnd || 7;
        this.html = '';
        this.pageLink = 'javascript:void(0)';
        this.ellipsisText = '...';
        this.clsPrefix = 'jboxnumber';
        this.activeClsName = 'active';
        this.disableClsName = 'disabled';
        this.showFirstEllipsis = true;
        this.showLastEllipsis = true;
        this.showPrevious = true;
        this.showNext = true;
        this.showPageNumbers =true;
        this.prevText = '&laquo;';
        this.nextText = '&raquo;'; 
        this.ulClass = '';
        this.hidePrevious = false; 
        this.hideNext = false;
        this.send = o.send || function(){};
        if(typeof o.boxHome==="undefined"){
        this.boxHome = document.createElement("div");
        if(typeof document.body !== "undefined")
           document.body.appendChild(this.boxHome);
        }
        else{
        this.boxHome = document.querySelector(o.boxHome) || document.getElementById(o.boxHome);
        }
        if(this.pageEnd>this.totalPage){
          this.pageEnd=this.totalPage;
          this.pageElement=this.totalPage;
        }
        return this.writePage();
    },
    writeElement:function(){
      var istance=this;  
        if (istance.currentPage<=istance.pageRange+1) {
            istance.pageStart = 1;
            istance.pageEnd = istance.pageElement;
        }
        if (istance.pageStart <= (istance.currentPage) && istance.currentPage>=istance.pageElement) {
            istance.pageStart = istance.currentPage - istance.pageElement;
            istance.pageEnd = istance.currentPage + istance.pageRange;
        }
      
    if (istance.pageEnd <= (istance.currentPage + istance.pageRange)) {
            istance.pageStart = istance.currentPage - istance.pageRange;
            istance.pageEnd = istance.currentPage + istance.pageRange;
        }
        if (istance.pageEnd >= istance.totalPage) {
            istance.pageEnd = istance.totalPage;
            if(istance.totalPage-istance.pageElement<1)
            istance.pageStart = 1;
            else
            istance.pageStart = istance.totalPage - istance.pageElement;     
        }
        
        var i,html="";
        
        if (istance.pageRange === null) {
          for (i = 1; i <= istance.totalPage; i++) {
            if (i == istance.currentPage) {
               html += '<li class="' + istance.clsPrefix + '-box ' + istance.activeClsName + '"><a>' + i + '<\/a><\/li>';
            } else {
              html += '<li class="' + istance.clsPrefix + '-box"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage( '+ i+')">' + i + '<\/a><\/li>';
            }
          }
          return html;
        }

        if (istance.pageStart <= 3) {
          for (i = 1; i < istance.pageStart; i++) {
            if (i == istance.currentPage) {
               html += '<li class="' + istance.clsPrefix + '-box ' + istance.activeClsName + '"><a onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage('+ i+')">' + i + '<\/a><\/li>';
            } else {
              html += '<li class="' + istance.clsPrefix + '-box"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage('+ i+')">' + i + '<\/a><\/li>';
            }
          }
        } else {
          if (istance.showFirstEllipsis) {
            html += '<li class="' + istance.clsPrefix + '-box ' + istance.clsPrefix + '-first"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage(1)">1<\/a><\/li>';
          }
          html += '<li class="' + istance.clsPrefix + '-ellipsis ' + istance.disableClsName + '"><a>' + istance.ellipsisText + '<\/a><\/li>';
        }

        for (i = istance.pageStart; i <= istance.pageEnd; i++) {
          if (i == istance.currentPage) {
            html += '<li class="' + istance.clsPrefix + '-box ' + istance.activeClsName + '"><a>' + i + '<\/a><\/li>';
          } else {
            html += '<li class="' + istance.clsPrefix + '-box"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage('+ i+')">' + i + '<\/a><\/li>';
          }
        }

        if (istance.pageEnd >= istance.totalPage - 2) {
          for (i = istance.pageEnd + 1; i <= istance.totalPage; i++) {
            html += '<li class="' + istance.clsPrefix + '-box"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage('+ i+')">' + i + '<\/a><\/li>';
          }
        } else {
          html += '<li class="' + istance.clsPrefix + '-ellipsis ' + istance.disableClsName + '"><a>' + istance.ellipsisText + '<\/a><\/li>';

          if (istance.showLastEllipsis) {
            html += '<li class="' + istance.clsPrefix + '-box ' + istance.clsPrefix + '-last"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage('+ istance.totalPage+')">' + istance.totalPage + '<\/a><\/li>';
          }
        }

         return html;
       
      },
      writePage: function() {
        var istance=this;  
        istance.html = '';
       

        if (this.showPrevious || istance.showPageNumbers || istance.showNext) {
          istance.html += '<div class="jboxnumber"><div class="jboxnumber-navs">';

          if (this.ulClass) {
            istance.html += '<ul class="' + istance.ulClass + '">';
          } else {
            istance.html += '<ul>';
          }

     
          if (istance.showPrevious) {
            if (istance.currentPage <= 1) {
              if (!istance.hidePrevious) {
                istance.html += '<li class="' + istance.clsPrefix + '-prev ' + istance.disableClsName + '"><a>' + istance.prevText + '<\/a><\/li>';
              }
            } else {
              istance.html += '<li class="' + istance.clsPrefix + '-prev" data-num="' + (istance.currentPage - 1) + '" title="Previous page"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage(' + (istance.currentPage - 1) + ')">' + istance.prevText + '<\/a><\/li>';
            }
          }
 
          if (this.showPageNumbers) {
            istance.html += istance.writeElement();
          }
 
          if (istance.showNext) {
            if (istance.currentPage >= istance.totalPage) {
              if (!istance.hideNext) {
                istance.html += '<li class="' + istance.clsPrefix + '-next ' + istance.disableClsName + '"><a>' + istance.nextText + '<\/a><\/li>';
              }
            } else {
              istance.html += '<li class="' + istance.clsPrefix + '-next " data-num="' + (this.currentPage + 1) + '" title="Next page"><a href="' + istance.pageLink + '" onclick="jBoxNumber.boxing[\''+istance.name+'\'].changePage(' + (istance.currentPage + 1) + ')">' + istance.nextText + '<\/a><\/li>';
            }
          }
          istance.html += '<\/ul><\/div><\/div>';
        }
       
         istance.boxHome.innerHTML=istance.html;
         
       return istance;
      },
      changePage:function(i){
       var istance=this;  
       istance.currentPage=i;
       if(typeof istance.send ==="function")
        istance.send(i);
       return istance.writePage();
      }
}

jBoxNumber.get = function (n,o) {
    if (typeof (n) === "undefined")
        n = new Date().getTime();
    if (typeof (jBoxNumber.boxing[n]) === "undefined")
        jBoxNumber.boxing[n] = new jBoxNumber(n,o);
    return jBoxNumber.boxing[n];
};
