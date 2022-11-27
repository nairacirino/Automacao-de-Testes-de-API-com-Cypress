import tokenFixture from "../../../fixtures/token.json"
import productReviewFixture from "../../../fixtures/product-review.json"
import statusFixture from "../../../fixtures/status.json"
import productReviewWooCommerceSchema from "../../../contracts/wooCommerce/productreview.contract"
import { faker } from "@faker-js/faker"

describe('Smoke Test', () => {

    it('Should create a product review', () => {
        let reviewer_email = faker.internet.email()

        cy.postProductReviewWooCommerce(
            tokenFixture.token,
            productReviewFixture.validReview.product_id,
            productReviewFixture.validReview.review,
            productReviewFixture.validReview.reviewer,
            reviewer_email,
            productReviewFixture.validReview.rating
        ).then((response) => {
            
            let id = response.body.id

            expect(response.status).to.eq(statusFixture.created)
            expect(response.body.product_id).to.eq(productReviewFixture.validReview.product_id)
            expect(response.body.review).to.eq(productReviewFixture.validReview.review)
            expect(response.body.reviewer).to.eq(productReviewFixture.validReview.reviewer)
            expect(response.body.reviewer_email).to.eq(reviewer_email)
            expect(response.body.rating).to.eq(productReviewFixture.validReview.rating)

            return productReviewWooCommerceSchema.validateAsync(response.body),

            cy.deleteProductReviewWooCommerce(
                tokenFixture.token,
                id,
                productReviewFixture.deleteReview.force
            )
        })
    })

})