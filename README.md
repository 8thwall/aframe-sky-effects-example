# A-Frame: Sky Effects Template

This Sky Effects template project showcases the sky coaching overlay, explains how to use the sky scene to attach assets to the sky segmentation layer, and how to replace the sky texture.

<video playsinline autoplay muted loop controls src="src/assets/preview.mp4" />
## Usage

1. On this repository, click **Code** > **Download ZIP**. If you clone the repository instead, make sure you have Git LFS installed and run `git lfs pull`
2. Unzip the folder to the location you'd like to work in
3. `npm install`
4. `npm run serve`
5. To connect to a mobile device, follow [these instructions](https://8th.io/test-on-mobile)
6. Recommended: Track your files using [git](https://git-scm.com/about) to avoid losing progress

## Deployment

This project contains Github Actions configuration for deployment to Github Pages, which triggers automatically by pushing the `main` branch. You can also create a production build using `npm run build`, which outputs the production build to the `dist` folder, and publish to the web using [this guide](https://8thwall.org/docs/getting-started/publishing#self-hosting-your-project).

## *Developing Sky Effects Experiences*
Sky effects scenes are designed for scenes that exist only in the sky.

1. In your `<a-scene>` add the `xrlayers` component
2. In your scene, add a sky scene using `<a-entity xrlayerscene="name:sky"></a-entity>` 
3. Parent objects under the sky scene to attach them to the sky layer.

Using Components for Sky Effects

* The `#pivot` `<a-entity>` will help you position assets in a spherical manner, it acts as a pivot that you offset your object from
and then lets you position the object by rotating the pivot on the x and y axes. You may have to alter the rotation of the object itself depending on where you
are positioning the object.
* Use the `edgeSmoothness` attribute of the `<a-entity xrlayerscene="name:sky>` element to feather the segmentation mask so that the edge between sky and not sky is more natural.
* Use the `invertLayerMask` attribute of the `<a-entity xrlayerscene="name:sky>` element to overlay everything but sky pixels within the sky scene.

* The `sky-coaching-overlay` helps instruct users to find the sky in order to start the sky effects experience.

## *Remote Desktop Development Setup*
![](https://media.giphy.com/media/HyrfHNnj0UKpnDj7PM/giphy-downsized-large.gif)

It is often helpful to use the `sky-remote-authoring` component to position sky effects content remotely on your desktop. 
To set up this project's scene for remote desktop development, disable any components related to 8thWall's AR engine or mobile development
by adding a letter to the beginning (i.e. `Zxrlayers`) or removing it altogether. The `sky-remote-authoring` component will automatically remove the following components:

- `xrlayers`
- `xrextras-loading`
- `xrextras-runtime-error`
- `landing-page`
- `sky-coaching-overlay`

Next, add the `sky-remote-authoring` component to your `<a-scene>` element as last component in the list of attached components (after `xrlayers`).

Now you can open the sky effects scene and position content relative to the sky through any desktop browser!

Extra Notes:
* Make sure opacity is set to 1 on the `<a-sky>` element if the sky texture is not visible.
* Toggle the foreground element using the schema value `foreground` on the `sky-remote-authoring` component.
* The `sky-remote-authoring` component will automatically reparent elements in your sky scene to the `<a-scene>` for desktop development
* Ensure `sky-remote-authoring` is listed last/in the correct order on the `<a-scene>` element or else remote authoring may not work correctly.

## *Other Features* 
* Laptop Mode: Sky effects also work on laptop cameras.
* Pin to Camera: Pin sky effects to the camera instead of to the world by nesting the whole sky scene within the `<a-camera>` or you can
append the camera to the sky scene and append specific objects to the camera. 
* Remote Development: An alternative to using the `sky-remote-authoring` component would be to use a stock image of the sky ([example](https://wallpapercave.com/wp/wp2894344.jpg)) on a monitor.

## About Sky Effects
With Sky Effects for 8th Wall, developers now have the power to turn day into night, stage an AR alien 
invasion with flying UFOs and let users interact with larger than life characters that tower over 
the city skyline. While the sky's the limit in the use of this new feature, Sky Effects are a perfect 
way to celebrate a new movie release, add visual effects to an outdoor concert  or take a sports game to the next level
