const checkboxPass = document.getElementById("checkboxPass");



// Mode
const Theme = localStorage.getItem("theme");

        if (Theme === "dark") {
            Mode("dark", "light");
        } else {
            Mode("light", "dark");
        }

function Mode(onMode, offMode) {
    const modeOn = document.getElementById("md_"+onMode);
    const modeOff = document.getElementById("md_"+offMode);
    const body = document.querySelector("body");
    modeOn.style.display = "none";
    modeOff.style.display = "flex";
    body.classList.add(onMode+"-mode");
    body.classList.remove(offMode+"-mode");
    localStorage.setItem("theme", onMode);
}



// option add room
const moreHTML = `<ul class="box-sd bg-box">
                                    <li class="more-option hv-purple">Thêm phòng</li>
                                    <li class="more-option hv-purple">Sắp xếp</li>
                                </ul>`;
let moreShow = false;
const moreContent = document.getElementById("more_content");
document.addEventListener("click", (event) => {
    if (event.target.id === "more-btn" || event.target.classList[0] === "more-option" ) {
        return;
    } else {
        clearMoreContent();
        moreShow = false;
    }
});
function moreBtn() {
    if (!moreShow) {
        moreContent.innerHTML = moreHTML;
        moreShow = true;
    } else {
        clearMoreContent();
        moreShow = false;
    }
}
function clearMoreContent() {
    moreContent.innerHTML = "";
}

