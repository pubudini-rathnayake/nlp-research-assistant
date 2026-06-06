PLAN_LIMITS = {
    "free": {
        "max_papers": 3,
        "max_questions_per_day": 10,
        "max_comparisons": 1,
        "can_access_trends": False,
        "can_access_team": False,
    },
    "pro": {
        "max_papers": 999999,
        "max_questions_per_day": 999999,
        "max_comparisons": 999999,
        "can_access_trends": True,
        "can_access_team": False,
    },
    "team": {
        "max_papers": 999999,
        "max_questions_per_day": 999999,
        "max_comparisons": 999999,
        "can_access_trends": True,
        "can_access_team": True,
    },
}

def get_plan_limits(plan: str) -> dict:
    return PLAN_LIMITS.get(plan, PLAN_LIMITS["free"])

def can_upload_paper(user) -> bool:
    limits = get_plan_limits(user.plan)
    return user.papers_uploaded < limits["max_papers"]

def can_ask_question(user) -> bool:
    limits = get_plan_limits(user.plan)
    return user.questions_asked_today < limits["max_questions_per_day"]

def can_compare(user) -> bool:
    limits = get_plan_limits(user.plan)
    return user.comparisons_done < limits["max_comparisons"]

def can_access_trends(user) -> bool:
    limits = get_plan_limits(user.plan)
    return limits["can_access_trends"]

def can_access_team(user) -> bool:
    limits = get_plan_limits(user.plan)
    return limits["can_access_team"]