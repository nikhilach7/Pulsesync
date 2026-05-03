"""
Alembic migration for initial tables
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'incidents',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.String, nullable=False),
        sa.Column('source', sa.String, nullable=False),
        sa.Column('priority', sa.String, nullable=False),
        sa.Column('status', sa.String, nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=False),
        sa.Column('updated_at', sa.DateTime, nullable=False),
        sa.Column('rca', sa.Text, nullable=True),
    )
    op.create_table(
        'signals',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('source', sa.String, nullable=False),
        sa.Column('type', sa.String, nullable=False),
        sa.Column('message', sa.Text, nullable=False),
        sa.Column('timestamp', sa.String, nullable=False),
        sa.Column('incident_id', sa.Integer, sa.ForeignKey('incidents.id')),
    )

def downgrade():
    op.drop_table('signals')
    op.drop_table('incidents')
