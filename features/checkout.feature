@smoke @regression
Feature: Checkout

  Background:
    Given I am logged in as a standard user
    And I add "Sauce Labs Backpack" to the cart
    And I open the cart

  Scenario: Complete an order with valid customer details
    When I proceed to checkout
    And I enter valid customer information
    And I continue to order overview
    And I finish the order
    Then I should see the order confirmation

  Scenario: Checkout validation when first name is missing
    When I proceed to checkout
    And I enter customer information with first name ""
    And I continue to order overview
    Then I should see checkout error "Error: First Name is required"
