import tokenFixture from "../../../fixtures/token.json"
import statusFixture from "../../../fixtures/status.json"
import productReviewWooCommerceSchema from "../../../contracts/wooCommerce/productreview.contract"

describe('Smoke Test', () => {

    it('Should retrieve all review', () => {
        cy.getProductReviewWooCommerce(
            "",
            tokenFixture.token
        ).then((response) => {
            expect(response.status).to.eq(statusFixture.ok)

            for (let index = 0; index < response.body.length; index++) {
                return productReviewWooCommerceSchema.validateAsync(response.body[index])
            }
        })
    })

})
