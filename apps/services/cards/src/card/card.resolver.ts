import { Resolver, Query } from '@nestjs/graphql';

@Resolver("Card")
export class CardResolver {
    @Query('card')
    async card() {
        return {
            id: "1",
            title: "Card 1",
            description: "This is a card",
            status: "todo"
        };
    }

}
