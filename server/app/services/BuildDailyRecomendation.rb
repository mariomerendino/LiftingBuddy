class BuildDailyRecomendation
  attr_accessor :survey
  def initialize(user_workouts)
    @survey = user_workouts
  end

  def run
    response = GPTService.new(build_prompt).ask
    response = JSON.parse(response)
    response["choices"][0]["message"]["content"]
  end

  private
  
  def build_prompt
    "Pretend to be a personal trainer \
    Write a one sentance reply. \
    /"
  end
end