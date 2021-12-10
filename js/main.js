const main = $("#main");
$.ajax({
    url: "../data/bigbang.json",
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
        $("#main").fullpage({
            scrollBar: true,
            onLeave: function (origin, destination, direction) {
                gsap.from(`.section:nth-child(${destination.index + 1}) .char`, {
                    y: -200,
                    opacity: 0,
                    ease: "bounce",
                    duration: 1.5,
                    stagger: {
                        each: 0.01,
                        from: "random",
                    },
                });
            },
        });
        gsap.from(".section:nth-child(1) .char", {
            y: -200,
            opacity: 0,
            ease: "bounce",
            duration: 1.5,
            stagger: {
                each: 0.01,
                from: "random",
            },
        });
    },
});

// $.get("../data/bigbang.json").done(function (res) {
//     console.log(res);
// });
