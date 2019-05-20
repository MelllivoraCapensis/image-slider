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
	    this.imagesListPositions = 
	        [
		        {
		        	key: 'top',
		        	label: 'Сверху'
		        },
		        {
		        	key: 'right',
		        	label: 'Справа'
		        },
		        {
		        	key: 'bottom',
		        	label: 'Снизу'
		        },
		        {
		        	key: 'left',
		        	label: 'Слева'
		        }
		    ];

		this.features = [
            {
            	label: 'Ширина Слайдера',
            	name: 'width'
            },
            {
            	label: 'Высота Слайдера',
            	name: 'height'
            },
            {
            	label: 'Ширина Блока Списка',
            	name: 'listMinSize' 
            },
            {
            	label: 'Размер изображения в списке',
            	name: 'imageSize'
            },
            {
            	label: 'Отступ между изображениями в списке',
            	name: 'imageOffset'
            }
        ];

	    this.defaultSettings = {
        	listPosition: 'top',
            width: 500,
            height: 300,
            imageSize: 120,
            imageOffset: 10,
            listMinSize: 80
        };

        this.state = {
        	imagesDefault: true,
            imagesList: this.defaultImagesList,
            settings: {}
        }

        this.init();
	}

	set imagesList (list) {
		this.state.imagesList = list;
		this.render();
	}

	set sliderWidth (value) {
		const correctValue = parseFloat(value);
		if(isNaN(correctValue))
		{
			this.render();
			return;
		}
		if(correctValue > 1200 || correctValue < 200)
		{
			this.render();
			return;
		}
		this.state.settings.width = correctValue;
		this.render();
	}

	set sliderHeight (value) {
		const correctValue = parseFloat(value);
		if(isNaN(correctValue))
		{
			this.render();
			return;
		}
		if(correctValue > 1000 || correctValue < 100)
		{
			this.render();
			return;
		}
		this.state.settings.height = correctValue;
		this.render();
	}

	set sliderImageSize (value) {
		const correctValue = parseFloat(value);
		if(isNaN(correctValue))
		{
			this.render();
			return;
		}
		if(correctValue > 300 || correctValue < 40)
		{
			this.render();
			return;
		}
		this.state.settings.imageSize = correctValue;
		this.render();
	}

	set sliderImageOffset (value) {
		const correctValue = parseFloat(value);
		if(isNaN(correctValue))
		{
			this.render();
			return;
		}
		if(correctValue > 50 || correctValue < 0)
		{
			this.render();
			return;
		}
		this.state.settings.imageOffset = correctValue;
		this.render();
	}

	set sliderListMinSize (value) {
		const correctValue = parseFloat(value);
		if(isNaN(correctValue))
		{
			this.render();
			return;
		}
		if(correctValue > 300 || correctValue < 30)
		{
			this.render();
			return;
		}
		this.state.settings.listMinSize = correctValue;
		this.render();
	}
    
    set sliderListPosition (value) {
    	this.state.settings.listPosition = value;
    	this.render();
	}

	init () {
		Object.assign(this.state.settings, this.defaultSettings);
		this.build();
		this.render();
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
      
        

        this.featuresWrapper = this.appendDom('div', this.box,
        	['box__features-wrapper'], false);

        this.features.forEach((feature) => {
        	const featureName = feature.name;
            const label = feature.label;
	        this[featureName + 'Selector'] = this.appendDom('div', this.featuresWrapper,
	        	['box__feature'], false);
	        this[featureName + 'SelectorLabel'] = this.appendDom('label', 
	        	this[featureName + 'Selector'], ['box__feature-label'], 
	        	label);
	        this[featureName + 'SelectorInput'] = this.appendDom('input', 
	        	this[featureName + 'SelectorLabel'], ['box__feature-input'], false);
        })

        this.listPositionSelector = this.appendDom('div', this.box,
        	['box__position-selector'], false);
        this.listPositionSelectorLabel = this.appendDom('label', this.listPositionSelector,
        	['box__position-selector-label'], 'Позиция списка слайдов');
        this.listPositionSelectorInput = this.appendDom('select', this.listPositionSelector,
        	['box__position-selector-input'], false);

        this.imagesListPositions.forEach((item) => {
            const option = this.appendDom('option', this.listPositionSelectorInput,
            	[], item.label);
            option.value = item.key;
        })


        this.subWrapper = this.appendDom('div', this.wrapper,
        	['subwrapper'], false);
        this.sliderWrapper = this.appendDom('div', this.subWrapper,
        	['box__slider-wrapper'], false);

        this.slider = new ImageSlider(this.sliderWrapper,
	        this.state.imagesList, this.state.settings.width,
	        this.state.settings.height, this.state.settings.listPosition,
	        this.state.settings.listMinSize, this.state.settings.imageSize,
	        this.state.settings.imageOffset);

        this.loaderWrapper = this.appendDom('div', this.subWrapper,
            ['box__loader-wrapper'], false);
        this.loader = new ImageLoader(this.loaderWrapper);
	}

	addHandlers () {
		this.addDataButtonsHandlers();
		this.addSettingsHandlers();
	}

	addSettingsHandlers () {
		this.widthSelectorInput.onchange = () => {
            this.sliderWidth = this.widthSelectorInput.value;
		}

		this.heightSelectorInput.onchange = () => {
            this.sliderHeight = this.heightSelectorInput.value;
		}

		this.imageSizeSelectorInput.onchange = () => {
            this.sliderImageSize = this.imageSizeSelectorInput.value;
		}

		this.imageOffsetSelectorInput.onchange = () => {
            this.sliderImageOffset = this.imageOffsetSelectorInput.value;
		}

		this.listMinSizeSelectorInput.onchange = () => {
            this.sliderListMinSize = this.listMinSizeSelectorInput.value;
		}

		this.listPositionSelectorInput.onchange = () => {
            this.sliderListPosition = this.listPositionSelectorInput.value;
		}
	}
    
    addDataButtonsHandlers () {
    	this.dataSelectorDefault.onclick = () => {
    		this.state.imagesDefault = true;
    		this.imagesList = this.defaultImagesList;
       	}  
    	this.dataSelectorCustom.onclick = () => {
    		const customImagesList = this.loader.getImages();
    		if(customImagesList.length == 0)
    			return;
    		this.state.imagesDefault = false;
    		this.imagesList = this.loader.getImages();
     	}      
    }

    render () {
    	this.sliderWrapper.innerHTML = '';
    	this.slider = new ImageSlider(this.sliderWrapper,
	        this.state.imagesList, this.state.settings.width,
	        this.state.settings.height, this.state.settings.listPosition,
	        this.state.settings.listMinSize, this.state.settings.imageSize,
	        this.state.settings.imageOffset);

    	this.widthSelectorInput.value = this.state.settings.width;
    	this.heightSelectorInput.value = this.state.settings.height;
    	this.imageSizeSelectorInput.value = this.state.settings.imageSize;
    	this.imageOffsetSelectorInput.value = this.state.settings.imageOffset;
    	this.listMinSizeSelectorInput.value = this.state.settings.listMinSize;
    	this.listPositionSelectorInput.selected = this.state.settings.listPosition;
        
        const activeClass = 'box__data-selector-button--active';
        if(this.state.imagesDefault)
            {
            	this.dataSelectorDefault.classList.add(activeClass);
            	this.dataSelectorCustom.classList.remove(activeClass);
            }
        else
        	{
            	this.dataSelectorDefault.classList.remove(activeClass);
            	this.dataSelectorCustom.classList.add(activeClass);
            }
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

new App(document.querySelector('.wrapper'));




