from PIL import Image, ImageDraw, ImageFont
import os

class TeamPreviewGenerator:
    def __init__(self):
        self.WIDTH = 1200
        self.HEIGHT = 800
        self.BACKGROUND_COLOR = (34, 139, 34)  # Forest Green
        self.FONT_COLOR = (255, 255, 255)
        self.SECTION_COLORS = {
            'WICKET_KEEPER': (255, 140, 0),  # Orange
            'BATSMAN': (65, 105, 225),      # Royal Blue
            'ALL_ROUNDER': (148, 0, 211),   # Purple
            'BOWLER': (220, 20, 60)         # Crimson
        }
        
        # Create fonts directory if it doesn't exist
        if not os.path.exists('fonts'):
            os.makedirs('fonts')
            
        # Create assets directory if it doesn't exist
        if not os.path.exists('assets'):
            os.makedirs('assets')

    def create_cricket_field(self):
        # Create a new image with green background
        image = Image.new('RGB', (self.WIDTH, self.HEIGHT), self.BACKGROUND_COLOR)
        draw = ImageDraw.Draw(image)
        
        # Draw cricket pitch
        pitch_color = (222, 184, 135)  # Tan color for pitch
        draw.rectangle([(self.WIDTH//2 - 30, 100), (self.WIDTH//2 + 30, self.HEIGHT-100)], 
                      fill=pitch_color)
        
        # Draw boundary circle
        draw.ellipse([(50, 50), (self.WIDTH-50, self.HEIGHT-50)], 
                    outline=(255, 255, 255), width=3)
        
        return image, draw

    def add_section_labels(self, draw):
        try:
            font = ImageFont.truetype("fonts/arial.ttf", 24)
        except:
            font = ImageFont.load_default()

        # Add section labels
        sections = {
            'WICKET KEEPER': (self.WIDTH//2, self.HEIGHT-150),
            'BATSMEN': (200, self.HEIGHT//2),
            'ALL-ROUNDERS': (self.WIDTH//2, self.HEIGHT//2),
            'BOWLERS': (self.WIDTH-200, self.HEIGHT//2)
        }
        
        for label, pos in sections.items():
            draw.text(pos, label, font=font, fill=self.FONT_COLOR, anchor="mm")

    def add_player(self, draw, name, role, position):
        try:
            font = ImageFont.truetype("fonts/arial.ttf", 20)
        except:
            font = ImageFont.load_default()

        # Draw player icon (circle for now, can be replaced with actual icons)
        icon_radius = 20
        draw.ellipse([
            (position[0]-icon_radius, position[1]-icon_radius),
            (position[0]+icon_radius, position[1]+icon_radius)
        ], fill=self.SECTION_COLORS[role])
        
        # Draw player name
        draw.text((position[0], position[1]+30), name, 
                 font=font, fill=self.FONT_COLOR, anchor="mm")

    def generate_preview(self, team_data):
        image, draw = self.create_cricket_field()
        self.add_section_labels(draw)
        
        # Position calculations for different roles
        positions = {
            'WICKET_KEEPER': [(self.WIDTH//2, self.HEIGHT-200)],
            'BATSMAN': [
                (200, 200),
                (200, 350),
                (200, 500),
                (350, 200),
                (350, 500)
            ],
            'ALL_ROUNDER': [
                (self.WIDTH//2, 200),
                (self.WIDTH//2, 350),
                (self.WIDTH//2, 500)
            ],
            'BOWLER': [
                (self.WIDTH-200, 200),
                (self.WIDTH-200, 350),
                (self.WIDTH-200, 500),
                (self.WIDTH-350, 200),
                (self.WIDTH-350, 500)
            ]
        }
        
        # Add players to their positions
        for role, players in team_data.items():
            for idx, player in enumerate(players):
                if idx < len(positions[role]):
                    self.add_player(draw, player, role, positions[role][idx])
        
        return image

    def save_preview(self, team_data, filename):
        image = self.generate_preview(team_data)
        image.save(filename)

# Example usage
if __name__ == "__main__":
    generator = TeamPreviewGenerator()
    
    # Example team data
    team = {
        'WICKET_KEEPER': ['MS Dhoni'],
        'BATSMAN': ['Virat Kohli', 'Rohit Sharma', 'KL Rahul', 'Shubman Gill'],
        'ALL_ROUNDER': ['Hardik Pandya', 'Ravindra Jadeja', 'Axar Patel'],
        'BOWLER': ['Jasprit Bumrah', 'Mohammed Shami', 'Kuldeep Yadav', 'Mohammed Siraj']
    }
    
    generator.save_preview(team, 'team_preview.png')
