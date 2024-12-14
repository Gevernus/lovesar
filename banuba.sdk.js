let SDK_VERSION = "1.16.1";
window.BANUBA_CLIENT_TOKEN = "Qk5CINnRkiUd94uFWrYoWZ5gGF7kwZp6eMwcNXCO7XR4H3XTBnf9amz910Cm+qVVTKnQ4X5ElssUJp4rJaJAj99CwliY2nsfnmqfYLTKe16FVFEBPjU9CaICejw79EGviboAfnrLrM+vD85hLfBmcf9BkMfk47nIfUXFjA8IhpX+Nzl3N4YL64566ptE1enj595K+6DZzTxltq1GTzdMvkAHMi9mWqTCOoag5OyAZmRJztsrG/4KwdrLrGEatCseqt572+IbQgAgTG1jPJwsXVtYK2PMj1wlJa8c2LRkOT4j/0RJdpPwv5exy1gKK7aUpQfudUCxgs7w1brVDuAt6s9VCyG6lhfydo37lF/F7Z26raMsGqYtWVJVRIpsgPj+uJdSEzXKPbZMsy87WBpuB/NKkA2DWUNAf3hliGWAccZzuJHrRQL11OTqxZR2q511eq9oBXo1acgeA767vo6u1XuiIXda/PNIrjPExSy9ljgoJbsTLqrwvndeh6cmhdvxTWgSN9vEQcD0j0Xtk6ys5t9rxCZ7f+W65FAB9B4CQCO17H1iDZEtnkPnfah9lFIilHGRHp+nhdS3Om4f70Juofc4xbvtVNwhsvDU04kBh7/ex7nWr8R7bjuohjyBMKYFnp0rgeZxjJIPQoj6h1kQtHPZwA=="

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
    "background",
    "body",
    "eyes",
    "face_tracker",
    "hair",
    "hands",
    "lips",
    "skin",
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
    effect.evalJs(`Softlight.strength(${params.softlight})`)
};