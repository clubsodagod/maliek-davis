import { getContentReactions, reactToContent } from "@/utility/fetchers/blog.fetcher";
import mongoose from "mongoose";

export interface AppServiceType {
    interactionService: InteractionService
}



/**
 * Service class that manages interactions.
 * Implements the IInteractionManager interface.
 */
export class InteractionService implements IInteractionManager {
    /**
     * Creates a new BlogInteraction instance.
     * 

     */
    blog(reaction: ReactionFormType): BlogInteraction {
        return new BlogInteraction(reaction);
    }
}


export interface IInteractionManager {
    blog(reaction:ReactionFormType): BlogInteraction;
}



/**
 * Class representing a blog interaction.
 * Implements the IBlogInteraction interface.
 */
export class BlogInteraction implements IBlogInteraction {

    /**
     * The interaction form associated with the blog interaction.
     */
    interaction: ReactionFormType;

    /**
     * Creates an instance of BlogInteraction.
     * @param interaction - The interaction form associated with the blog interaction.
     */
    constructor(
        interaction: ReactionFormType,
    ){
        this.interaction = interaction;
    }

    /**
     * Reacts to the content with the specified reaction.
     * @param reaction - The type of reaction to be made.
     * @returns A promise that resolves to a ResponseStatus object indicating the result of the reaction.
     */
    async react(): Promise<ResponseStatus> {
        try {
            const response: ResponseStatus = await reactToContent(this.interaction);

            if (response.error === true) {
                throw new Error(response.message);
            } else {
                return {
                    error: false, message: response.message
                };
            }
        } catch (error) {
            return {
                error: true, message: `${error}`
            };
        }
    }

    async fetchReactions(blogID:mongoose.Types.ObjectId): Promise<IReaction[]|ResponseStatus> {
        try {
            const response: IReaction[]|ResponseStatus = await getContentReactions(blogID);

            if ("error" in response) {
                throw new Error(response.message);
            } else {
                return response
            }
        } catch (error) {
            return {
                error: true, message: `${error}`
            };
        }
    }
}



export type ResponseStatus = {
    error:boolean;
    message:string;
}



export interface IReaction extends Document {
    actor: {
        userID: mongoose.Types.ObjectId;
        photo: string;
        firstName: string;
        lastName: string;
    };
    recipient: {
        recipientID: mongoose.Types.ObjectId;
    };
    content: {
        contentID: mongoose.Types.ObjectId;
        name: string;
        slug: string;
    };
    reaction: ReactionChoices;
}


/**
 * Type representing the possible reaction choices.
 */
export type ReactionChoices = "🔥" | "❤️" | "😂" | "😢" | "😮";



/**
 * Type representing the form for a reaction.
 */
export type ReactionFormType = {
    actor: {
        /**
         * The ID of the user who is reacting.
         */
        userID: mongoose.Types.ObjectId;
        /**
         * The photo of the user who is reacting.
         */
        photo: string;
        /**
         * The first name of the user who is reacting.
         */
        firstName: string;
        /**
         * The last name of the user who is reacting.
         */
        lastName: string;
    };
    recipient: {
        /**
         * The ID of the recipient of the reaction.
         */
        recipientID: mongoose.Types.ObjectId;
    };
    content: {
        /**
         * The ID of the content being reacted to.
         */
        contentID: mongoose.Types.ObjectId;
        /**
         * The name of the content being reacted to.
         */
        name: string;
        /**
         * The slug of the content being reacted to.
         */
        slug: string;
    };
    /**
     * The reaction choice.
     */
    reaction: ReactionChoices;
}


export interface IInteractionService<P> {
    interaction:P;
}

export interface IBlogInteraction extends IInteractionService<InteractionFormTypes>{
    react(reaction:ReactionFormType):Promise<ResponseStatus>;
    fetchReactions(blogID:mongoose.Types.ObjectId):Promise<IReaction[]|ResponseStatus>;
    // comment(comment:P):Promise<ResponseStatus>;
    // vote(vote:P):Promise<ResponseStatus>;
    // like(like:P):Promise<ResponseStatus>;
    // share(share:P):Promise<ResponseStatus>;
    // report(report:P):Promise<ResponseStatus>;
    // addToCollection(post:any):Promise<ResponseStatus>
}


export type InteractionFormTypes = ReactionFormType