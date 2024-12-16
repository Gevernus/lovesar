let SDK_VERSION = "1.16.1";
eruda.init();
window.BANUBA_CLIENT_TOKEN = "Qk5CIJGbG6aC0I304LeJkWSCzzeBIU6ojuul2seF8PlOhcZjRMO5Ub2kn95e5+NdrQU7g01AVsNMg7vspCb4y7gS/ymCETZoivri4NKSs4mXhvRz4yQlE1a9sKiJ+OF0xbe6Gumdxy1eePLZXUcuuGD2646GWP3XveG8za/A6ac5XZVrY2iwp+4mz6ZRulDaQTnT9wt+/+ariCRi+xqHYtGhG8PORYIGhoLV7kL04ZS8vyZi3JlXggqVgqC+nhfdEnF/OT3+vhZ3aqNsJyVJ0yRwc1Trz3pdvSenK4jYjNNStmO5UpKjgBuV5VsJpI5hDyqdOKOjq0eJG9z0hCPdXwxCeZXquJtPfcnlxB6Lom+YY9AXcGT0CI234J45rVF7efFlkELyMvYfUYB+/pqt508DXyuvIiccj3NPgaE7OSepC3vk9h9/OMv9t5xEHGkQ4Qtr4bUw9KtEGDLPkKFVJdnkjssO9IcgDD0F30z2Kh3RMhfjXpVlkQBpk1bbrNRs2r7SmhJPPOfXfJqe6CuwAwsMXc8Xonl0dmOMCIHsZEVg7Jdz1U/nyTC2g5N6Y5EFC1ukHi6AZYWKbdJ9fBJznRtmnKeO9juN9/HHpbJ9EkIFsNlGmC53+bCjt6G4Ok5sXQbLudGMvRTgg7hb0BmB7rscNA=="

const {
    Dom,
    Player,
    Module,
    Effect,
    Webcam,
} = await import(
    `https://cdn.jsdelivr.net/npm/@banuba/webar@${SDK_VERSION}/dist/BanubaSDK.browser.esm.min.js`
);

const sdkUrl = "https://cdn.jsdelivr.net/npm/@banuba/webar";
const modulesList = [
    // "background",
    // "body",
    // "eyes",
    "face_tracker",
    // "hair",
    // "hands",
    "lips",
    // "skin",
];

console.log("Load player with SDK: ", SDK_VERSION);

const player = await Player.create({
    clientToken: window.BANUBA_CLIENT_TOKEN,
    locateFile: `${sdkUrl}@${SDK_VERSION}/dist`,
});

await Promise.all(
    modulesList.map(async (moduleId) => {
        try {
            const module = await Module.preload(
                `https://cdn.jsdelivr.net/npm/@banuba/webar@${SDK_VERSION}/dist/modules/${moduleId}.zip`
            );
            await player.addModule(module);
        } catch (error) {
            console.warn(`Load module ${moduleId} error: `, error);
        }
    })
);

// Initialize the camera
const webcam = new Webcam();
player.use(webcam);

// Render the player in your DOM
Dom.render(player, "#webar");
const effect = new Effect('assets/effects/Makeup_new_morphs.zip');
await player.applyEffect(effect);
// Apply the desired effect
export const setParams = async (params) => {
    effect.evalJs(`Lips.color("${params.lipsColor}")`)
    effect.evalJs(`Brows.color("${params.browsColor}")`)
    effect.evalJs(`Makeup.eyeshadow("${params.eyeShadow ? params.eyeShadow : "0 0 0 0"}")`)
    effect.evalJs(`Makeup.blushes("${params.blushes ? params.blushes : "0 0 0 0"}")`)
    // effect.evalJs(`Makeup.blushes("0.70 0.15 0.16 0.98")`)
    effect.evalJs(`Eyelashes.color("${params.eyeLashes ? params.eyeLashes : "0 0 0 0"}")`)
    // effect.evalJs(`Makeup.eyeshadow("0.70 0.15 0.16 0.98")`)
    effect.evalJs(`Softlight.strength(${params.softlight})`)
};