const main = $("#main");
let fullpage = null;
loadJson("../data/bigbang.json");
function loadJson(jsondata) {
    //함수선언 -> 자동 hoisting (제일 위로 올라감)
    $.ajax({
        url: jsondata,
        success: function (res) {
            //console.log(res);
            const clockList = res.clock;
            let otuput = "";
            $.each(clockList, function (idx, item) {
                //console.log(item);
                otuput += `
                <div class="section" style="background-image:url(${item.bg})">
                    <div class="info">
                        <p class="category" data-splitting>${item.category}</p>
                        <h2 class="title" data-splitting>${item.title}</h2>
                        <p class="depth" data-splitting><strong>${item.depth}</strong> mm</p>
                        <p class="price" data-splitting>CHF ${item.price}</p>
                    </div>
                </div>`;
            });
            main.html(otuput);
            Splitting();
            charMotion(`.section:nth-child(1) .char`);
            if (fullpage !== null) {
                $.fn.fullpage.destroy("all");
            }
            $("#main").fullpage({
                scrollBar: true,
                onLeave: function (origin, destination, direction) {
                    charMotion(`.section:nth-child(${destination.index + 1}) .char`);
                },
            });
            fullpage = $.fn.fullpage;
        },
    });
}

function charMotion(char) {
    gsap.from(char, {
        y: -200,
        opacity: 0,
        ease: "bounce",
        duration: 1.5,
        stagger: {
            // each: 0.01,
            amount: 1,
            from: "random",
        },
    });
}

//1번째 방법 배열 이용
/*
const jsonFileList = ["../data/bigbang.json", "../data/classic.json"];
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
    e.preventDefault();
    const idx = $(this).index();
    loadJson(jsonFileList[idx]);
});
*/

//2번째 방법 html 파일에 직접 작성 후 js에서 불러오기
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
    e.preventDefault();
    const jsonFile = $(this).data("json");
    if ($(this).hasClass("selected")) {
        return;
    }
    $(this).addClass("selected").siblings("li").removeClass("selected");
    loadJson(jsonFile);
    //$.fn.fullpage.destroy("all");
});
