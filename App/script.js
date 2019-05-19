class App {
	constructor (wrapper) {
		this.wrapper = wrapper;
        this.defaultImagesList = [
		    {
		    	src: 'App/img/body-back.png',
		    	label: 'First Image'
		    },
		    {
		    	src: 'App/img/body-back1.png',
		    	label: 'Second Image'
		    },
		    {
		    	src: 'App/img/body-back2.png',
		    	label: 'Third Image'
		    },
		    {
		    	src: 'App/img/body-back3.png',
		    	label: 'Fourth Image'
		    },
		    {
		    	src: 'App/img/body-back4.png',
		    	label: 'Fifth Image'
		    }
		    ,
		    {
		    	src: 'App/img/body-back1.png',
		    	label: 'Second Image'
		    },
		    {
		    	src: 'App/img/body-back2.png',
		    	label: 'Third Image'
		    },
		    {
		    	src: 'App/img/body-back3.png',
		    	label: 'Fourth Image'
		    },
		    {
		    	src: 'App/img/body-back4.png',
		    	label: 'Fifth Image'
		    },
		    {
		    	src: 'App/img/body-back.png',
		    	label: 'First Image'
		    },
		    {
		    	src: 'App/img/body-back1.png',
		    	label: 'Second Image'
		    },
		    {
		    	src: 'App/img/body-back2.png',
		    	label: 'Third Image'
		    },
		    {
		    	src: 'App/img/body-back3.png',
		    	label: 'Fourth Image'
		    },
		    {
		    	src: 'App/img/body-back4.png',
		    	label: 'Fifth Image'
		    }
		    ,
		    {
		    	src: 'App/img/body-back1.png',
		    	label: 'Second Image'
		    },
		    {
		    	src: 'App/img/body-back2.png',
		    	label: 'Third Image'
		    },
		    {
		    	src: 'App/img/body-back3.png',
		    	label: 'Fourth Image'
		    },
		    {
		    	src: 'App/img/body-back4.png',
		    	label: 'Fifth Image'
		    }
	    ];
	    this.defaultSettings = {
        	format: 'top',
            width: 500,
            height: 300,
            imageSize: 120,
            imageOffset: 10,
            listMinSize: 80
        };

        this.state = {
        	imagesDefault: true,
            imagesList: this.defaultImagesList,
            slider: this.defaultSettings 
        }

        this.init();
	}

	set imagesList (list) {
		this.state.imagesList = list;
		this.renderImagesList();
	}

	init () {
		this.build();
		this.addHandlers();
	}

	build () {
        this.box = this.appendDom('div', this.wrapper,
        	['box'], false);

        this.dataSelector = this.appendDom('div', this.box,
        	['box__data-selector'], false);
        this.dataSelectorLabel = this.appendDom('label', this.dataSelector,
        	['box__data-selector-label'], 'Изображения в слайдере:');
        this.dataSelectorDefault = this.appendDom('button', 
        	this.dataSelector, ['box__data-selector-button'],
        	'По умолчанию');
        this.dataSelectorCustom = this.appendDom('button',
        	this.dataSelector, ['box__data-selector-button'],
        	'Добавленные');
        this.dataSelectorDefault.type = 'checkbox';
        this.subWrapper = this.appendDom('div', this.wrapper,
        	['subwrapper'], false);
        this.sliderWrapper = this.appendDom('div', this.subWrapper,
        	['box__slider-wrapper'], false);

        this.slider = new ImageSlider(this.sliderWrapper,
	        this.state.imagesList, this.state.slider.width,
	        this.state.slider.height, this.state.slider.format,
	        this.state.slider.listMinSize, this.state.slider.imageSize,
	        this.state.slider.imageOffset);

        this.loaderWrapper = this.appendDom('div', this.subWrapper,
            ['box__loader-wrapper'], false);
        this.loader = new ImageLoader(this.loaderWrapper);
	}

	addHandlers () {
		this.addDataButtonsHandlers();
	}
    
    addDataButtonsHandlers () {
    	this.dataSelectorDefault.onclick = () => {
    		this.imagesList = this.defaultImagesList;
    		this.state.imagesDefault = true;
    	}  
    	this.dataSelectorCustom.onclick = () => {
    		const customImagesList = this.loader.getImages();
    		if(customImagesList.length == 0)
    			return;
    		this.imagesList = this.loader.getImages();
    		this.state.imagesDefault = false;
    	}      
    }

    renderImagesList () {
    	this.sliderWrapper.innerHTML = '';
    	this.slider = new ImageSlider(this.sliderWrapper,
	        this.state.imagesList, this.state.slider.width,
	        this.state.slider.height, this.state.slider.format,
	        this.state.slider.listMinSize, this.state.slider.imageSize,
	        this.state.slider.imageOffset);
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

new App(document.querySelector('.container'));




