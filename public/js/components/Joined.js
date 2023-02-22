export default {
    name: "TheChatMessageComponent",
    props: ['join'],

    template: `
    <article class="chat-messages" :class="{'other-messages': matchedID }">
        <p>A user has joined</p>
    </article>
    `
}