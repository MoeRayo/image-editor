<template>
	<div class="flex flex-column flex-row-ns pa3 calisto bg-black-05">
		<div class="w-50-ns w-100 ph3">
			<!-- upload image -->
			<form enctype="multipart/form-data" v-if="isInitial || isSaving">
				<h2>Add Image</h2>
				<div
					class="b--dashed bw1 b--light-purple pa3 hover-bg-black-10 bg-animate pointer relative h4">
					<input
						type="file"
						id="fileInput"
						accept="image/*"
						:name="uploadFieldName"
						:disabled="isSaving"
						@change="filesChange($event.target.name, $event.target.files)"
						class="input-file absolute w-100 h4 pointer o-0" />
					<p v-if="isInitial" class="tc f4">
						Drag your image here to begin<br />
						or click to browse
					</p>
					<p v-if="isSaving" class="tc f4">Adding image...</p>
				</div>
			</form>
			<!--adding successful-->
			<div v-if="isSuccess">
				<h2>Image added successfully.</h2>
				<button
					@click.prevent="reset()"
					class="bg-light-purple mb3 link dim br2 pointer ba b--light-blue dib white">
					Upload another
				</button>
				<img class="db center" :src="imageURL" :alt="imageName" />
			</div>
			<!--upload failed-->
			<div v-if="isFailed">
				<h2>Uploaded failed.</h2>
				<button @click.prevent="reset()">Try again</button>
				<pre>{{ uploadError }}</pre>
			</div>
		</div>
		<section class="w-40-l w-50-m w-100 ph3 tl" v-if="imageURL">
			<h2>Transform Image</h2>
			<form class="ba b--black bw2 bg-white br2 mw6 center pv2 ph4 shadow-5 f6">
				<div>
					<label for="height" class="dib mb2 mr2 black-70 f5 w-30"
						>Height</label
					>
					<input
						type="number"
						name="height"
						id="height"
						class="dib mb3 br2 pa2 ba bw1 b--black"
						v-model="height"
						@keyup="debounceTransform" />
				</div>
				<div>
					<label class="dib mb2 mr2 black-70 f5 w-30" for="width">Width</label>
					<input
						type="number"
						name="width"
						id="width"
						class="dib mb3 br2 pa2 ba bw1 b--black"
						@keyup="debounceTransform"
						v-model="width" />
				</div>
				<div>
					<label class="dib mb2 mr2 black-70 f5 w-30" for="sharpen"
						>Sharpen</label
					>
					<input
						type="number"
						name="sharpen"
						id="sharpen"
						class="dib mb3 br2 pa2 ba bw1 b--black"
						@keyup="debounceTransform"
						v-model="sharpen"
						min="1"
						max="10" />
				</div>
				<div>
					<label class="dib mb2 mr2 black-70 f5 w-30" for="blur">Blur</label>
					<input
						type="number"
						name="blur"
						id="blur"
						class="dib mb3 br2 pa2 ba bw1 b--black"
						@keyup="debounceTransform"
						v-model="blur"
						min="1"
						max="250" />
				</div>
				<button
					@click="downloadimage"
					class="center db pv2 ph3 mb3 tracked bg-black ba br3 white hover-black hover-bg-black-30 bg-animate pointer f7">
					Download
				</button>
			</form>
		</section>
	</div>
</template>

<script>
	import { upload } from "@/utils/file-upload.service.js";
	import { wait } from "@/utils/wait.js";
	import { getXataClient } from "@/xata";
	import { transformImage } from "@xata.io/client";
	import debounce from "lodash/debounce";
	const xata = getXataClient();

	const STATUS_INITIAL = 0,
		STATUS_SAVING = 1,
		STATUS_SUCCESS = 2,
		STATUS_FAILED = 3;

	export default {
		data() {
			return {
				addedImages: [],
				uploadError: null,
				currentStatus: null,
				uploadFieldName: "photos",
				imageDataArray: [],
				recordId: null,
				height: 100,
				sharpen: 0,
				blur: 0,
				width: 100,
				transformedImage: null,
				imageURL: "",
				imageName: "",
				transformedImageUrl: "",
			};
		},
		computed: {
			isInitial() {
				return this.currentStatus === STATUS_INITIAL;
			},
			isSaving() {
				return this.currentStatus === STATUS_SAVING;
			},
			isSuccess() {
				return this.currentStatus === STATUS_SUCCESS;
			},
			isFailed() {
				return this.currentStatus === STATUS_FAILED;
			},
		},
		methods: {
			reset() {
				// reset form to initial state
				this.currentStatus = STATUS_INITIAL;
				this.addedImages = [];
				this.uploadError = null;
			},
			save(formData) {
				// upload data to the server
				this.currentStatus = STATUS_SAVING;
				upload(formData)
					.then(wait(2000)) //delaying the promise
					.then((x) => {
						this.addedImages = [].concat(x);
						this.uploadImageToXata();
						this.currentStatus = STATUS_SUCCESS;
					})
					.catch((err) => {
						this.uploadError = err.response;
						this.currentStatus = STATUS_FAILED;
					});
			},
			filesChange(fieldName, fileList) {
				// handle file changes
				const formData = new FormData();
				if (!fileList.length) return;
				// append the files to FormData
				Array.from(Array(fileList.length).keys()).map((x) => {
					formData.append(fieldName, fileList[x], fileList[x].name);
				});
				// save it
				this.save(formData);
			},
			prepareFormData() {
				const parts = this.addedImages[0].url.split(",");
				const metaDataMatch = parts[0].match(/^data:(.*?);base64/);
				const metaData = metaDataMatch[1];
				const base64Data = parts[1];
				const imageDataObject = {
					mediaType: metaData,
					base64Content: base64Data,
					name: this.addedImages[0].fileName,
					enablePublicUrl: true,
				};
				// Push the object to the imageDataArray
				this.imageDataArray.push(imageDataObject);
			},
			async uploadImageToXata() {
				this.prepareFormData();
				await xata.db.images
					.create({
						image: this.imageDataArray,
					})
					.then((res) => {
						this.imageDataArray = [];
						this.imageURL = res.image[0].url;
						this.imageName = res.image[0].name;
						this.recordId = res.id;
					})
					.catch(() => {
						this.$notify({ type: "error", text: "Uploading failed!" });
					});
			},
			debounceTransform: debounce(function () {
				this.editImage();
			}, 2000),
			async editImage() {
				const xataImageData = await xata.db.images.read(this.recordId);
				this.transformedImage = xataImageData.image[0].transform({
					height: this.height,
					width: this.width,
					blur: this.blur,
					sharpen: this.sharpen,
				});
				this.imageURL = this.transformedImage.url;
			},
			downloadimage() {
				this.transformedImageUrl = transformImage(this.imageURL, {
					download: this.imageName,
					format: "jpeg",
				});
				window.open(this.transformedImageUrl, "_blank");
			},
		},
		mounted() {
			this.reset();
		},
	};
</script>
