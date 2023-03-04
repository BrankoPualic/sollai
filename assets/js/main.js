const url=window.location.pathname,emailRe=/^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;function slider(){let e=$(".slides"),t=$(".coverSliderButtons"),a=1,l=null;function c(){null===l&&(l=setInterval(function(){let l=a===e.length?1:a+1;t.eq(l-1).trigger("click")},4e3))}function r(){t.removeClass("active"),t.eq(a-1).addClass("active")}t.click(function(){null!==l&&(clearInterval(l),l=null);let t=$(this).data("slide");if(t!==a){let n=e.eq(a-1),o=e.eq(t-1);n.fadeOut(400,function(){n.addClass("hidden"),o.removeClass("hidden").fadeIn(400),a=t,r(),c()})}}),r(),c()}function createNavigation(e){for(let t of(content="",e))t==e[0]?content+=`<li class="collection">
            <a href="${t.href}">${t.text}</a></li>`:content+=`<li>
        <a href="${t.href}">${t.text}</a></li>`;$("#menu > nav > ul").html(content)}function createDdl(e,t,a){for(let l of(content=`<option value="0">${a}</option>`,e))content+=`<option value="${l.id}">${l.name}</option>`;$(`#${t}`).html(content)}function scrollToTop(){$(window).on("scroll",function(){window.scrollY>500?$(".back-to-top").addClass("show"):$(".back-to-top").removeClass("show")})}function createProducts(e,t){if("/sollai/shop.html"==url&&(e=searchFilter(e=sorting(e=filterByPrice(e=filterCategories(e=filterBrands(e)))))),content="",0==e.length)content+="<p>There is no product for selected filtering.</p>";else for(let a of e)content+=`<div class="product">
        <div class="productImg">
        <img src="${a.image}" alt="${a.name}"/>`,a.collection&&(content+='<div class="productCollectionTag">WINTER COLLECTION</div>'),content+=`</div>
      <div class="productContent">
      <div class="txt">
      <h4>${a.name}</h4>
      <p>${a.desc}</p>
      </div>
      <div class="prices">
      <p>${a.price.online} $</p>
      <p class="mpPrice">${a.price.store} $ <span class="mp">in sotres</span></p>
      </div>
      <div class="buyButton">
      <p>add to cart</p>
      </div>
      <input type="hidden" value="${a.id}"/></div></div>
      `;$(`#${t}`).html(content);let l=$(".buyButton"),c;null==(c=JSON.parse(localStorage.getItem("cart")))&&(c=[]),l.each(t=>{$(l[t]).click(()=>{let a=$(l[t]).next();c.push(e.find(e=>e.id==$(a).val())),addToLocalStorage(c),$(".succBuy").css("display","block"),setTimeout(()=>{$(".succBuy").css("display","none")},3e3)})})}function ajaxCall(e,t,a,l){$.ajax({url:`files/${e}.json`,method:"get",dataType:"json",success:function(e){t(e,a,l)},error:function(e){console.log(e)}})}function otherPagesProductCreation(e,t,a){if(content="",newArray=[],"collection"==a)for(let l=0;l<e.length;l++)!0==e[l].collection&&newArray.push(e[l]);if("bestSeller"==a)for(let c=0;c<e.length;c++)!0==e[c].bestSeller&&newArray.push(e[c]);createProducts(newArray,t)}function createCheckBox(e,t,a){for(let l of(content=`<h3>${a}:</h3>
  <div class="checkBox">`,e))content+=`
    <div>
    <label for="${l.name.toLowerCase()}">${l.name}</label>
    <input type="checkbox" value="${l.id}" name="${l.name.toLowerCase()}" id="${l.name.toLowerCase()}" class="${a}"/>
    </div>`;content+="</div>",$(`#${t}`).html(content),$(`.${a}`).change(filterChange)}function filterBrands(e){let t=[],a=$(".brand:checked");return(a.each(e=>{t.push(parseInt($(a[e]).val()))}),0!=t.length)?e.filter(e=>t.includes(e.brand)):e}function filterCategories(e){let t=[],a=$(".category:checked");return(a.each(e=>{t.push(parseInt($(a[e]).val()))}),0!=t.length)?(console.log(e.filter(e=>e.category.some(e=>t.includes(e)))),e.filter(e=>e.category.some(e=>t.includes(e)))):e}function searchFilter(e){let t=$("#search").val().toLowerCase();return t?e.filter(e=>-1!==e.name.toLowerCase().indexOf(t)):e}function sorting(e){let t=$("#sort").val();return 1==t?e.sort((e,t)=>e.name>t.name?1:-1):2==t?e.sort((e,t)=>e.name<t.name?1:-1):3==t?e.sort((e,t)=>Number(e.price.online)>Number(t.price.online)?1:-1):4==t?e.sort((e,t)=>Number(e.price.online)<Number(t.price.online)?1:-1):e}function filterByPrice(e){let t=Number($("#rnPrice").val());return t?e.filter(e=>e.price.online<=t):e}function filterChange(){ajaxCall("products",createProducts,"productsShop")}function FormRegex(e,t,a,l){return e.match(a)?$(`#${t}`).css("display","none"):($(`#${t}`).css("display","block"),l++),l}function addToLocalStorage(e){localStorage.setItem("cart",JSON.stringify(e))}function createCart(e){content="";let t=0,a=0;try{let l=[...new Map(e.map(e=>[e.id,e])).values(),];for(let c of l){let r=e.filter(e=>e.id==c.id).length;content+=`<div class="cartItem">
      <div class="cartImg">
      <img src="${c.image}" alt="${c.name}"/>
      </div>
      <div class="cartInfo">
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
      </div>
      <div class="cartItemPrice">
      <p>${c.price.online} $</p>`;let n=c.price.online;content+=`</div>
      <div class="cartItemQuant">
      <p><i class="fa-solid fa-plus"></i></p>
      <span class="qnt">${r}</span>`,content+=`<p><i class="fa-solid fa-minus"></i></p>
      <input type="hidden" value="${c.id}"/>
      </div>
      <div class="cartItemTotal">
      <p>${totalItemPrice(n,r)} $</p>
      </div></div>`,t+=r,a+=totalItemPrice(n,r)}a=Math.round(100*a)/100,$("#cartItemWrapper > p").css("display","none"),$(".cartItems").html(t),$("#cartItemWrapperIn").html(content),$("#totaltotal").html(a),$("#checkOut").css("display","block")}catch(o){o instanceof TypeError&&console.error("Can't work with function map because there is not a single product added to cart.")}}function totalItemPrice(e,t){return Math.round(e*t*100)/100}function calculateNewPrice(e,t,a){let l=Math.round(e.split(" ")[0]*a*100)/100;$(t).text(`${l} $`)}function emptyCart(e){try{0==e.length&&($("#cartItemWrapper > p").css("display","block"),localStorage.removeItem("cart"),setTimeout(()=>{$("#checkOut").css("display","none")},3e3))}catch(t){t instanceof TypeError&&console.error("Length is null because there are no items in local storage.")}}function totalPriceCheckOutChange(e,t){let a=t.split(" "),l=$("#totaltotal").html(),c;c=e?Number(l)+Number(a[0]):Number(l)-Number(a[0]),$("#totaltotal").html(Math.round(100*c)/100)}$(window).on("load",function(){if(console.log("Start"),console.log(url),$("#ham").click(()=>{$("#menu").toggle()}),scrollToTop(),ajaxCall("navMenu",createNavigation),$("#footerSub").click(()=>{let e=$("#subsEmail").val(),t=0;(t=FormRegex(e,"mailFooter",emailRe,t))||($("#emailFooterSuccess").css("display","block"),$("#subsEmail").val(""),setTimeout(()=>{$("#emailFooterSuccess").css("display","none")},4e3))}),"/sollai/"==url||"/sollai/index.html"==url){ajaxCall("products",otherPagesProductCreation,"productsHomePage","bestSeller"),ajaxCall("subject",createDdl,"subject","SUBJECT *"),slider();let e=/^([A-ZČĆŽŠĐ]{1}([a-zčćžšđ]){1,15})$/,t=/^[a-zA-Z]{2,}$/;$("#submitForm").click(a=>{a.preventDefault();let l=$("#firstName").val(),c=$("#lastName").val(),r=$("#country").val(),n=$("#email").val(),o=0;o=FormRegex(l,"firstNameRe",e,o),o=FormRegex(c,"lastNameRe",e,o),o=FormRegex(r,"countryRe",t,o),o=FormRegex(n,"mailRe",emailRe,o);let s,i=$('input[name="gender"]');for(let d=0;d<i.length;d++)!1==i[0].checked&&!1==i[1].checked?($("#genderRe").css("display","block"),o++):i[d].checked&&(s=d,$("#genderRe").css("display","none"));0==$("#subject").val()?($("#subjectRe").css("display","block"),o++):$("#subjectRe").css("display","none");""==$("#txtArea").val()?($("#txtAreaRe").css("display","block"),o++):$("#txtAreaRe").css("display","none"),o||($("#messageSent").css("display","block"),$("#firstName").val(""),$("#lastName").val(""),$("#country").val(""),$("#email").val(""),$("#subject").val(0),$("#txtArea").val(""),i[s].checked=!1,$("#textCount").html("0"),setTimeout(()=>{$("#messageSent").css("display","none")},4e3))});let a=$("#textCount");$("#txtArea").keyup(function(){let e=$("#txtArea").val().length;e>400?$("#txtArea").val($("#txtArea").val().substring(0,400)):a.html(e)})}if("/sollai/shop.html"==url&&(ajaxCall("products",createProducts,"productsShop"),ajaxCall("sort",createDdl,"sort","Sort By"),ajaxCall("brand",createCheckBox,"brands","brand"),ajaxCall("category",createCheckBox,"cat","category"),$("#priceBtn").click(filterChange),$("#sort").change(filterChange),$("#search").keyup(filterChange)),"/sollai/winter.html"==url&&ajaxCall("products",otherPagesProductCreation,"productsWinterPage","collection"),"/sollai/cart.html"==url){createCart(JSON.parse(localStorage.getItem("cart")));let l=$(".fa-plus"),c=JSON.parse(localStorage.getItem("cart"));l.each(e=>{$(l[e]).click(()=>{let t=$(l[e]).parent().next().next().next().val();c.push(c.find(e=>e.id==t)),addToLocalStorage(c);let a=Number($(l[e]).parent().next().text())+1;$(l[e]).parent().next().text(a);let r=$(l[e]).parent().parent().prev().children().text(),n=$(l[e]).parent().parent().next().children();calculateNewPrice(r,n,a);let o=$(".cartItems").html();$(".cartItems").html(Number(o)+1),totalPriceCheckOutChange(!0,r)})});let r=$(".fa-minus");r.each(e=>{$(r[e]).click(()=>{let t=$(r[e]).parent().next().val(),a=c.find(e=>e.id==t),n;for(let o in c)c[o].id==a.id&&(n=o);console.log(n),c.splice(n,1),addToLocalStorage(c);let s=Number($(r[e]).parent().prev().text())-1;0==s&&$(r[e]).parent().parent().parent().css("display","none"),$(r[e]).parent().prev().text(s);let i=$(l[e]).parent().parent().prev().children().text(),d=$(l[e]).parent().parent().next().children();calculateNewPrice(i,d,s);let u=$(".cartItems").html();$(".cartItems").html(Number(u)-1),emptyCart(c),totalPriceCheckOutChange(!1,i)})}),emptyCart(c),$("#check p").click(()=>{localStorage.removeItem("cart");let e=[];createCart(e),emptyCart(e),$("#succPurchase").css("display","block"),setTimeout(()=>{$("#succPurchase").css("display","none")},3e3)})}});