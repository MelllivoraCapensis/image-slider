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
		    * (this.imageWidth + this.itemOffset)
		    - (this.size.width - this.imageWidth) / 2;
	}

	set leftScroll (value) {
		const maxValue = Math.max(0, this.imageItems.length
		    * (this.imageWidth + this.itemOffset)
		    - this.size.width);
	    let correctValue = Math.min(maxValue, value);
	    correctValue = Math.max(0, correctValue);
	    this.state.leftScroll = correctValue;
	    this.renderLeftScroll();
	}

	init () {
		this.build();
		this.addHadlers();
	}

	build () {
		this.box = this.appendDom('div', this.wrapper,
			['slider-list__box'], false);
		this.box.style.height = this.size.height + 
		    (!this.isVertical ? this.padding * 2 : 0) + 'px';
		this.box.style.width = this.size.width + 
		    (this.isVertical ? 2 * this.padding : 0) + 'px';
		this.box.tabIndex = 0;
		this.box.style.overflow = 'hidden';
        
        this.imagesList = this.appendDom('ul', this.box,
			['slider-list__images'], false);

       	this.imagesList.style.flexDirection = 
       	    (this.isVertical ? 'column' : 'row');

        if(this.isVertical)
        {
        	this.imagesList.style.paddingLeft = '5px';
        	this.imagesList.style.paddingRight = '5px';
        }
        else
        {
        	this.imagesList.style.paddingTop = '5px';
        	this.imagesList.style.paddingBottom = '5px';
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
		
			image.src = imageData.src;
		})
	}

	addHadlers () {
		this.addClickHandler();
        this.addKeyHandler();
        this.addScrollHandler();
	}

	addClickHandler () {
		this.imageItems.forEach((imageItem, ind) => {

            imageItem.querySelector('.slider-list__image')
                .onclick = () => {
                    this.selectedNum = ind;
                } 
		})
	}

	addKeyHandler () {
		this.box.onkeydown = (e) => {
			if(e.key == 'ArrowRight')
			{
				this.selectedNum = this.state.selectedNum + 1;
			}
			if(e.key == 'ArrowLeft')
			{
				this.selectedNum = this.state.selectedNum - 1;
			}
		}
		this.imageItems.forEach((imageItem, ind) => {
			imageItem.onkeydown = (e) => {
				if(e.key == 'Enter')
					this.selectedNum = ind;
			}
		})
	}

	addScrollHandler () {
		this.box.onmousewheel = (e) => {
			e.preventDefault();
			this.leftScroll = this.state.leftScroll 
			+ Math.sign(e.deltaY) * this.scrollStep;
			
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

	renderLeftScroll () {
        this.imagesList.style.left = - this.state.leftScroll + 'px';
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
