export default {
    name: "TheChatMessageComponent",
    props: ['message'],

    template: `
    <article class="chat-messages" :class="{'other-messages': matchedID }">
        <h2>{{message.name}} says:</h2>
        <p>{{message.content}}</p>
    </article>
    `,

    data() {
        return {
            message: 'hello from the template',
            //every time an incoming message arrives, check against the userID to see if this is ours.
            //if it is apply a css class to indicate that it is ours
            //if it is not apply a different css class to make that obvious
            matchedID: this.$parent.socketID == this.message.id
        }
    }
}