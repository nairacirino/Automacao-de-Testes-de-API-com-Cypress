import tokenFixture from "../../../fixtures/token.json"
import productReviewFixture from "../../../fixtures/product-review.json"
import statusFixture from "../../../fixtures/status.json"
import { faker } from "@faker-js/faker"

describe('Smoke Test', () => {

    it('Should retrieve all review', () => {
        cy.getProductReviewWooCommerce(
            "",
            tokenFixture.token
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.ok)
        })
    })

})
