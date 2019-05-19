class ImageLoader  {
	constructor (wrapper) {
		this.wrapper = wrapper;
        this.iconSize =
        {
        	width: 70,
        	height: 50
        };
        this.state = {
        	imagesList: []
        }

        this.init();
	}

	set newImage (image) {
		this.state.imagesList.push(image);
		this.renderImages();
	}

	set delImageNum (value) {
		this.state.imagesList.splice(value, 1);
		this.renderImages();
	}

	set imagesList (list) {
		this.state.imagesList = list; 
        this.renderImages();
	}

	init () {
		this.build();
		this.addHandlers();
	}

	build () {
		this.box = this.appendDom('div', this.wrapper,
			['loader'], false);
		this.inputWrapper = this.appendDom('label', this.box,
			['loader__input-wrapper'], 'Добавить изображение');
		this.input = this.appendDom('input', this.inputWrapper,
			['loader__input'], false);
		this.input.type = 'file';
        this.input.multiple = 'multiple';

        this.clearButton = this.appendDom('button', this.box,
        	['loader__clear-button'], 'Очистить');

		this.list = this.appendDom('ul', this.box,
			['loader__list'], false);
	}

	addHandlers () {
		this.addInputHandler();
		this.addClearHandler();
	}

	addInputHandler () {
		this.input.onchange = (e) => {
			const files = this.input.files;

			for(let i = 0; i < files.length; i ++) {
               
				const file = files[i];

				if(file.type != 'image/png' &&
					file.type != 'image/jpeg')
					continue;


				const fileReader = new FileReader();
			    fileReader.readAsDataURL(file);

			    fileReader.onload = (e) => {
					this.newImage = {
						label: file.name,
						src: fileReader.result
					}
				}
			}

	    }
	}

	addClearHandler () {
		this.clearButton.onclick = () => {
			this.imagesList = [];
		}
	}

	renderImages () {
		this.list.innerHTML = '';
		this.state.imagesList.forEach((image, ind) => {
			const imageLi = this.appendDom('li', this.list,
				['loader__image-item'], false);

			const imageIcon = this.appendDom('img', imageLi,
				['loader__image-icon'], false);
			imageIcon.src = image.src;
			imageIcon.style.maxWidth = this.iconSize.width + 'px';
			imageIcon.style.maxHeight = this.iconSize.height + 'px';

			const imageLabel = this.appendDom('span', imageLi,
				['loader__image-label'], false);
			imageLabel.textContent = image.label.substring(0, 20) 
			    + (image.label.length > 20 ? '...' : '');

			const imageDelButton = this.appendDom('button', imageLi,
				['loader__image-delete'], false);
			imageDelButton.innerHTML = '&#10007;';
			imageDelButton.onclick = () => {
				this.delImageNum = ind;
			}
		})
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

	getImages () {
		return this.state.imagesList;
	}



}
