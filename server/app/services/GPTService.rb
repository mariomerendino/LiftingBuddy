class GPTService
  attr_accessor :prompt

  def initialize(prompt)
    @prompt = prompt
  end
  
  def ask
    conn = Faraday.new(url: 'https://api.openai.com/v1/chat/completions')

    response = conn.post do |req|
      req.headers = {
        'Content-Type' => 'application/json',
        "Authorization" => "Bearer #{ENV["OPEN_API_KEY"]}"
      }
      req.body = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
      }.to_json
    end

    return response.body

  end
end