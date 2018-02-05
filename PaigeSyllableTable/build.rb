#!/usr/bin/ruby

require 'builder'

paige_latin = %w[a i u e y o ia ua ie ue ai ui ei au io uo iai uai iei uei iau uau p b m c s x z t d n l k g h p m t n k 1 2].map.with_index{|e,i| [i+0xe040,e]}.to_h

initconsonants = [nil].concat(Array(0xe056..0xe063))
lastconsonants = [nil].concat(Array(0xe064..0xe068))
vowels = Array(0xe040..0xe055)
tones = [nil].concat(Array(0xe069..0xe06a))

File.open("paigeSyllables.svg", "w") do |file|
  builder = Builder::XmlMarkup.new(:indent=>2, :target=>file)
  builder.instruct!(:xml, :version=>"1.0", :encoding=>"UTF-8")

  builder.svg(
    :'xmlns:svg'=>"http://www.w3.org/2000/svg",
    :xmlns=>"http://www.w3.org/2000/svg",
    :viewBox=>"0 0 4000 2300", :width=>4000, :height=>2300){

    builder.g(:"font-family"=>"Paige", :"font-size"=>30){
      
      x = 0
      y = 1
      initconsonants.each do |init|
        tones.each do |tone|
          
          lastconsonants.each do |last|
            vowels.each do |vowel|
              builder.text(:x=>50*x, :y=>50*y, :fill=>"black"){
                syl = [init,vowel,last,tone].compact
                builder.tspan(:"font-family"=>"DejaVu Sarif", :"font-size"=>12, :x=>50*x, :y=>50*y){
                  builder << syl.map{|s| paige_latin[s]}.join()
                }
                builder.tspan(:x=>50*x, :y=>50*y+35){
                  builder << syl.pack("U*")
                }
              }

              x += 1
            end
          end
          
          y += 1
          x = 0
        end
      end
      
    }
  }
end

