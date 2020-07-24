import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealonScroll {
    constructor(els, thresholdPercent) {
        this.itemsToReveal = els;
        this.thresholdPercent = thresholdPercent;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
        this.browserHeight = window.innerHeight;
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            console.log("re-size done");
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        console.log("scroll detected")
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            }
        })
    }

    calculateIfScrolledTo(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;
            console.log("element was calculated")
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;
    
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {el.classList.add("reveal-item");
        el.isRevealed = false;
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}

export default RevealonScroll