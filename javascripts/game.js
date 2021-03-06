function Building(i, e, r, t, n, o, a, s) {
    this.code = i,
    this.name = e,
    this.invisible = r,
    this.disabled = t,
    this.locked = n,
    this.price = o,
    this.woods_per_second = a,
    this.quantity = s
}
function renderBuildings() {
    buildings.forEach(function(i) {
        class_str = (i.invisible ? "invisible" : "") + " " + (i.disabled ? "disabled" : "") + " " + (i.locked ? "locked" : ""),
        str = '<li id="' + i.code + '" class="' + class_str + '">',
        str += '<a href="#" class="anim-grow" data-code="' + i.code + '">',
        str += '<h2 class="title">',
        str += i.name,
        str += "<span>+" + i.woods_per_second + " wood / sec</span>",
        str += "</h2>",
        str += '<h2 class="hided-title">???</h2>',
        str += '<div class="price">Price: <span>' + Beautify(getBuildingCost(i)) + "</span></div>",
        str += '<div class="quantity">' + Beautify(i.quantity) + "</div>",
        str += "</a>",
        str += "</li>",
        $("ul#buildings").append(str)
    }),
    updateBuildings()
}
function updatePageTitle() {
    document.title = Beautify(woods) + " wood \u233E get wood"
}
function updateBuildings() {
    previous_building_disabled = !1,
    previous_building_quantity = 1,
    buildings.forEach(function(i) {
        1 == i.disabled && generatedwoodsAllTime >= getBuildingCost(i) && previous_building_quantity > 0 && (i.disabled = !1,
        $("#" + i.code).removeClass("disabled")),
        0 == i.disabled && (woods >= getBuildingCost(i) ? (i.locked = !1,
        $("#" + i.code).removeClass("locked")) : (i.locked = !0,
        $("#" + i.code).addClass("locked"))),
        1 == i.invisible && 0 == previous_building_disabled && (i.invisible = !1,
        $("#" + i.code).removeClass("invisible")),
        previous_building_disabled = i.disabled,
        previous_building_quantity = i.quantity
    })
}
function buyBuilding(i) {
    building = buildings[buildings_code.indexOf(i)];
    var e = getBuildingCost(building);
    if (0 == building.invisible && 0 == building.disabled && woods >= e) {
        building.quantity++,
        woodsPerSecond += building.woods_per_second,
        $("#" + building.code + " .quantity").html(building.quantity),
        removewoods(e);
        var r = getBuildingCost(building);
        $("#" + building.code + " .price span").html(Beautify(r)),
        updatewoodsPerSecond()
    }
}
function getBuildingCost(i) {
    return Math.floor(i.price * Math.pow(priceIncreaseFactor, i.quantity))
}
function formatEveryThirdPower(i) {
    return function(e) {
        var r = 0
          , t = "";
        if (!isFinite(e))
            return "Infinity";
        if (e >= 1e6) {
            for (e /= 1e3; Math.round(e) >= 1e3; )
                e /= 1e3,
                r++;
            if (r >= i.length)
                return "Infinity";
            t = i[r]
        }
        return Math.round(1e3 * e) / 1e3 + t
    }
}
function rawFormatter(i) {
    return Math.round(1e3 * i) / 1e3
}
function Beautify(i, e) {
    var r = i < 0
      , t = ""
      , n = i.toFixed(e);
    Math.abs(i) < 1e3 && e > 0 && Math.floor(n) != n && (t = "." + n.toString().split(".")[1]),
    i = Math.floor(Math.abs(i)),
    e > 0 && n == i + 1 && i++;
    var o = numberFormatters[1]
      , a = o(i).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "0" == a && (r = !1),
    r ? "-" + a : a + t
}
function shortenNumber(i) {
    if (i >= 1e6 && isFinite(i)) {
        var e = i.toString()
          , r = e.indexOf("e+");
        if (-1 == r)
            return i;
        for (var t = "", n = 0; n < r; n++)
            t += n < 6 ? e[n] : "0";
        return t += "e+",
        t += e.split("e+")[1],
        parseFloat(t)
    }
    return i
}
function addwoods(i) {
    generatedwoodsAllTime += i,
    woods += i,
    updateBuildings(),
    updatewoods()
}
function removewoods(i) {
    woods -= i,
    $("#woods-count").html(Beautify(woods))
}
function updatewoods() {
    updatePageTitle(),
    $("#woods-count").html(Beautify(woods))
}
function updatewoodsPerSecond() {
    $("#woods-per-second").html(Beautify(woodsPerSecond, 2))
}
function saveGame() {
    var i = {
        generatedwoodsAllTime: generatedwoodsAllTime,
        woods: woods,
        woodsPerSecond: woodsPerSecond,
        buildings: buildings
    };
    localStorage.setItem("save", JSON.stringify(i))
}
function loadGame() {
    var i = JSON.parse(localStorage.getItem("save"));
    i && (generatedwoodsAllTime = i.generatedwoodsAllTime,
    woods = i.woods,
    woodsPerSecond = i.woodsPerSecond,
    buildings = i.buildings),
    updatewoods(),
    updatewoodsPerSecond(),
    renderBuildings()
}
var priceIncreaseFactor = 1.15
  , buildings_code = [];
buildings_code = ["axe", "worker", "chain-saw", "head-saw", "saw-mill", "stump-grinder", "farm-house", "tree-farm", "barge", "tractor-saw", "forest", "dendrologist", "log-spliter", "board-cutter", "cut-sander", "", "", "", "", "", "", ""];
var generatedwoodsAllTime = 0
  , woods = 0
  , woodsPerSecond = 0
  , buildings = [];
buildings[0] = new Building(buildings_code[0],"Axe",!1,!1,!0,15,.1,0),
buildings[1] = new Building(buildings_code[1],"Worker",!1,!0,!0,100,.5,0),
buildings[2] = new Building(buildings_code[2],"ChainSaw",!0,!0,!0,500,4,0),
buildings[3] = new Building(buildings_code[3],"Head Saw",!0,!0,!0,3e3,10,0),
buildings[4] = new Building(buildings_code[4],"Saw Mill",!0,!0,!0,1e4,40,0),
buildings[5] = new Building(buildings_code[5],"Stump Grinder",!0,!0,!0,4e4,100,0),
buildings[6] = new Building(buildings_code[6],"Farm House",!0,!0,!0,2e5,400,0),
buildings[7] = new Building(buildings_code[7],"Tree Farm",!0,!0,!0,1e6,6666,0),
buildings[8] = new Building(buildings_code[8],"Barge",!0,!0,!0,5e6,98765,0),
buildings[9] = new Building(buildings_code[9],"Tractor Saw",!0,!0,!0,25e6,999999,0),
buildings[10] = new Building(buildings_code[10],"Forest",!0,!0,!0,1e8,1e7,0),
buildings[11] = new Building(buildings_code[11],"Dendrologist",!0,!0,!0,5e8,25e7,0),
buildings[12] = new Building(buildings_code[12],"Log Spliter",!0,!0,!0,2e9,50e7,0),
buildings[13] = new Building(buildings_code[13],"Board Cutter",!0,!0,!0,8e9,50e7,0),
buildings[14] = new Building(buildings_code[14],"Cut Sander",!0,!0,!0,1e10,50e7,0),
buildings[15] = new Building(buildings_code[15],"Log",!0,!0,!0,25e9,50e7,0),
buildings[16] = new Building(buildings_code[16],"Log Spliter",!0,!0,!0,2e9,50e7,0),
buildings[17] = new Building(buildings_code[17],"Log Spliter",!0,!0,!0,2e9,50e7,0),
buildings[18] = new Building(buildings_code[18],"Log Spliter",!0,!0,!0,2e9,50e7,0),
buildings[19] = new Building(buildings_code[19],"Log Spliter",!0,!0,!0,2e9,50e7,0),
buildings[20] = new Building(buildings_code[20],"Log Spliter",!0,!0,!0,2e9,50e7,0);
var formatLong = [" thousand", " million", " billion", " trillion", " quadrillion", " quintillion", " sextillion", " septillion", " octillion", " nonillion"]
  , prefixes = ["", "un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"]
  , suffixes = ["decillion", "vigintillion", "trigintillion", "quadragintillion", "quinquagintillion", "sexagintillion", "septuagintillion", "octogintillion", "nonagintillion"];
for (var i in suffixes)
    for (var ii in prefixes)
        formatLong.push(" " + prefixes[ii] + suffixes[i]);
var formatShort = ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]
  , prefixes = ["", "Un", "Do", "Tr", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]
  , suffixes = ["D", "V", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"];
for (var i in suffixes)
    for (var ii in prefixes)
        formatShort.push(" " + prefixes[ii] + suffixes[i]);
formatShort[10] = "Dc";
var numberFormatters = [formatEveryThirdPower(formatShort), formatEveryThirdPower(formatLong), rawFormatter];
var clickstranth = 1
$(document).ready(function() {
    loadGame(),
    $("#wood-button").click(function() {
        event.preventDefault(),
        addwoods(clickstranth),
        saveGame()
    }),
    $("ul#buildings").on("click", "a", function() {
        event.preventDefault(),
        buyBuilding($(this).data("code")),
        saveGame()
    }),
    $(".savegame").click(function() {
        event.preventDefault(),
        saveGame()
    }),
    window.setInterval(function() {
        addwoods(woodsPerSecond)
    }, 1e3),
    window.setInterval(function() {
        saveGame()
    }, 1e4)
});

