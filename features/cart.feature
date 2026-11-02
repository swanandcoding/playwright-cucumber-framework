@smoke @regression
Feature: Shopping cart

  Background:
    Given I am logged in as a standard user

  Scenario: View a product in the cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"

  Scenario: Continue shopping from cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I continue shopping
    Then I should see the products page
