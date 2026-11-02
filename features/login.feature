@smoke @regression
Feature: SauceDemo login

  Background:
    Given I open the SauceDemo login page

  Scenario: Login successfully with a standard user
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page

  @regression
  Scenario: Login fails for a locked out user
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see the login error "Sorry, this user has been locked out."

  @regression
  Scenario: Login fails with invalid credentials
    When I login with username "invalid_user" and password "wrong_password"
    Then I should see a login error message

  @regression
  Scenario: Login fails when password is empty
    When I login with username "standard_user" and password ""
    Then I should see a login error message

  @smoke
  Scenario: User can log out
    When I login with username "standard_user" and password "secret_sauce"
    And I log out
    Then I should be on the login page
