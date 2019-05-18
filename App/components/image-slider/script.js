class SliderList {
	constructor (wrapper, imagesData, width, height, 
		    imageSize, itemOffset, isVertical) {

        this.imagesData = imagesData;
        this.wrapper = wrapper;
        this.imageItems = [];
        this.imageSize= imageSize;
        this.itemOffset = itemOffset;
        this.isVertical = isVertical;
        this.padding = 5;
        this.touchMultiplyer = 0;
      
        this.scrollStep = 40;
        this.size = {
        	width: width,
        	height: height
        };

        this.state = {
        	selectedNum: 0,
        	scroll: 0
        }

        this.init();
	}

	set selectedNum (value) {
		let correctValue = Math.max(value, 0);
		correctValue = Math.min(correctValue, 
			this.imageItems.length -1);
		this.state.selectedNum = correctValue;
		this.renderSelectedItem();
        
      	this.scroll = this.state.selectedNum
		    * (this.imageSize + this.itemOffset)
		    - (this.sliderLen - this.imageSize) / 2;
	}

	set scroll (value) {
		const maxValue = Math.max(0, this.imageItems.length
		    * (this.imageSize + this.itemOffset)
		    - this.sliderLen);
	    let correctValue = Math.min(maxValue, value);
	    correctValue = Math.max(0, correctValue);
	    this.state.scroll = correctValue;
	    this.renderScroll();
	    this.renderProgress();
	}

	get progress () {
		return this.state.scroll / 
		    this.maxScroll;
	}

	init () {
		this.build();

		this.sliderLen = this.isVertical ? 
            this.size.height : this.size.width;

		this.maxScroll = Math.max(0, this.imageItems.length 
		    * (this.imageSize + this.itemOffset)
		    	- this.sliderLen);
	
		this.addHadlers();
	}

	build () {
		this.subwrapper = this.appendDom('div', this.wrapper,
			['slider-list__subwrapper'], false);
		this.subwrapper.classList.add('slider-list__subwrapper' 
		    + (this.isVertical ? '--vertical' : '--horizontal'));

		this.box = this.appendDom('div', this.subwrapper,
			['slider-list__box'], false);
		this.box.style.height = this.size.height + 
		    (!this.isVertical ? this.padding * 2 : 0) + 'px';
		this.box.style.width = this.size.width + 
		    (this.isVertical ? 2 * this.padding : 0) + 'px';
		this.box.tabIndex = 0;
		this.box.style.overflow = 'hidden';
        
        this.progressBar = this.appendDom('div', this.subwrapper,
        	['slider-list__progress-bar'], false);
        this.progressBar.classList.add('slider-list__progress-bar'
        	+ (this.isVertical ? '--vertical' : '--horizontal'));
        this.progressLine = this.appendDom('div', this.progressBar,
        	['slider-list__progress-line'], false);
        this.progressLine.classList.add('slider-list__progress-line'
        	+ (this.isVertical ? '--vertical' : '--horizontal'));


        this.imagesList = this.appendDom('ul', this.box,
			['slider-list__images'], false);

        // this.imagesList.classList.add('slider-list__images'
        // 	+ (this.isVertical ? '--vertical' : '--horizontal'));

       	this.imagesList.style.flexDirection = 
       	    (this.isVertical ? 'column' : 'row');

        if(this.isVertical)
        {
        	this.imagesList.style.paddingLeft = this.padding + 'px';
        	this.imagesList.style.paddingRight = this.padding + 'px';
        }
        else
        {
        	this.imagesList.style.paddingTop = this.padding + 'px';
        	this.imagesList.style.paddingBottom = this.padding + 'px';
        }
      
		this.imagesData.forEach((imageData, ind) => {
			const imageItem = this.appendDom('li', this.imagesList,
				['slider-list__image-item'], false);

			if(this.isVertical)
			{
				imageItem.style.paddingTop = this.itemOffset / 2 + 'px';
			    imageItem.style.paddingBottom = this.itemOffset / 2 + 'px';
			}
			else
			{
				imageItem.style.paddingRight = this.itemOffset / 2 + 'px';
		    	imageItem.style.paddingLeft = this.itemOffset / 2 + 'px';
			}
			
            imageItem.tabIndex = 0;

			this.imageItems.push(imageItem);
			
			const image = this.appendDom('img', imageItem, 
				['slider-list__image'], false);

			image.height = (this.isVertical ? this.imageSize : 
				this.size.height);
			image.width = (this.isVertical ? this.size.width :
				this.imageSize);
			image.dataset.num = ind;
		
			image.src = imageData.src;
		})
	}

	addHadlers () {
        this.addKeyHandler();
        this.addScrollHandler();
        this.addSwipeHandler();
        this.addProgressClickHandler();
	}

	addKeyHandler () {
		this.box.onkeydown = (e) => {
			const keyNext = this.isVertical ? 'ArrowDown'
			    : 'ArrowRight';
			const keyPrev = this.isVertical ? 'ArrowUp'
			    : 'ArrowLeft';
			if(e.key == keyNext)
			{
				this.shiftSelected(1);
			}
			if(e.key == keyPrev)
			{
				this.shiftSelected(-1);
			}
		}
		this.imageItems.forEach((imageItem, ind) => {
			imageItem.onkeydown = (e) => {
				if(e.key == 'Enter')
					this.selectedNum = ind;
			}
		})
	}

	shiftSelected (shiftNum) {
        this.selectedNum = this.state.selectedNum + shiftNum;
	}
    
    scrollTo (shiftValue) {
    	this.scroll = this.state.scroll + shiftValue;
    }


	addScrollHandler () {
		this.box.onwheel = (e) => {
			e.preventDefault();
			this.scroll = this.state.scroll 
			+ Math.sign(e.deltaY) * this.scrollStep
			this.imageSize / 2;
		}
	}

	addSwipeHandler () {

		this.imagesList.ondragstart = () => {
			return false;
		}

		this.imagesList.onmousedown = (e) => {
          
            const startTouch = {
            	left: e.clientX,
            	top: e.clientY
            };

            const startScroll = this.state.scroll;

            this.imagesList.onmousemove = (e) => {
                
                const touch = {
                	left: e.clientX,
                	top: e.clientY
                };

                const shift = this.isVertical ? 
                     touch.top - startTouch.top
                   : touch.left - startTouch.left;

                this.scroll = startScroll - shift;

            }

            this.imagesList.onmouseup = (e) => {
               
                this.imagesList.onmousemove = null;

            	const endTouch = {
            		left: e.clientX,
                	top: e.clientY
            	}

                const shift = this.isVertical ? 
                    endTouch.top - startTouch.top
                    : endTouch.left - startTouch.left;

               	if(shift == 0)
               	{
            		if(e.target.tagName == 'IMG')
            		    this.selectedNum = e.target.dataset.num;
               	}
          
            }

            this.imagesList.onmouseleave = (e) => {
            	this.imagesList.onmousemove = null;
            }

		}
            
	}

	addProgressClickHandler () {
		this.progressBar.onclick = (e) => {
			if(this.isVertical)
			{
				this.scroll = (e.clientY + pageYOffset - 
				this.getCoords(this.progressBar).top)
		    	/ this.size.height * this.maxScroll;
			}
				
			else
			{
				this.scroll = (e.clientX + pageXOffset - 
				this.getCoords(this.progressBar).left)
	     		/ this.size.width * this.maxScroll;
			}
					
		}

	}

	renderSelectedItem () {
		const activeClass = 'slider-list__image-item--active';
		const prevSelected = this.imagesList
		    .querySelector('.' + activeClass);
		if(prevSelected)
		    prevSelected.classList.remove(activeClass);
		this.imageItems[this.state.selectedNum]
		    .classList.add(activeClass);
	}

	renderScroll () {
		if(this.isVertical)
			this.imagesList.style.top = - this.state.scroll + 'px';
		else
			this.imagesList.style.left = - this.state.scroll + 'px';
	}

	renderProgress () {
		this.progressLine.style[(this.isVertical ?
			'height' : 'width')] = this.progress * 100 + '%';

	}

	appendDom (tag, parent, elemClasses, innerText) {
        const elem = document.createElement(tag);
        elemClasses.forEach((elemClass) => {
        	elem.classList.add(elemClass);
        })
        parent.appendChild(elem);
        if(innerText)
        	elem.textContent = innerText;
        return elem;
	}

	getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
	        top: box.top + pageYOffset,
		    left: box.left + pageXOffset
		};
	}
}

class SliderSelected {
	constructor () {

	}
}


class ImageSlider {
	constructor (wrapper, imagesList) {
        
	}



    appendDom (tag, parent, elemClasses, innerText) {
        const elem = document.createElement(tag);
        elemClasses.forEach((elemClass) => {
        	elem.classList.add(elemClass);
        })
        parent.appendChild(elem);
        if(innerText)
        	elem.textContent = innerText;
        return elem;
	}

}
